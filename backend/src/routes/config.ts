import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { pool } from '../db.js';

const router = Router();

// Schema para validar SiteConfig (mesmo do frontend)
const SiteConfigSchema = z.object({
  identity: z.object({
    name: z.string(),
    subtitle: z.string(),
    crp: z.string(),
  }),
  hero: z.object({
    description: z.string(),
  }),
  customPhoto: z.string().optional(),
sobre: z.object({
    card1Title: z.string().default(''),
    card1Text: z.string().default(''),
    card2Title: z.string().default(''),
    card2Text: z.string().default(''),
  }),
  comoAjudar: z.object({
    description: z.string(),
    items: z.array(z.string()),
  }),
  condicoesAtendidas: z.object({
    description: z.string(),
    items: z.array(z.string()),
  }),
  recursosTerapeuticos: z.object({
    description: z.string(),
    items: z.array(z.string()),
  }),
  conteudos: z.object({
    description: z.string(),
    items: z.array(z.string()),
  }),
  trajetoria: z.object({
    aulas: z.array(z.string()),
    palestras: z.array(z.string()),
    publicacoes: z.array(z.string()),
    experiencias: z.array(z.string()),
  }),
  missaoVisaoValores: z.object({
    missao: z.string().default(''),
    visao: z.string().default(''),
    valores: z.array(z.string().nullable()).default([]),
  }),
  contato: z.object({
    email: z.string(),
    telefone: z.string(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  navbar: z.array(z.string()),
  colors: z.record(z.string()),
  customSections: z.record(z.string(), z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(z.string()),
  })).optional(),
}).passthrough();

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// GET /api/config - Raw SQL query
router.get('/config', async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const siteResult = await client.query('SELECT * FROM sites WHERE id = $1', ['default-site']);
    if (siteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Site não encontrado' });
    }
    const site = siteResult.rows[0];

    // Query todas tabelas
    const [identity, hero, photo, sobre, contato, navbar, colors] = await Promise.all([
      client.query('SELECT * FROM identities WHERE site_id = $1', ['default-site']),
      client.query('SELECT * FROM heroes WHERE site_id = $1', ['default-site']),
      client.query('SELECT * FROM site_photos WHERE site_id = $1', ['default-site']),
      client.query('SELECT * FROM sobre WHERE site_id = $1', ['default-site']),
      client.query('SELECT * FROM contatos WHERE site_id = $1', ['default-site']),
      client.query('SELECT * FROM navbar_items WHERE site_id = $1', ['default-site']),
      client.query('SELECT colors FROM sites WHERE id = $1', ['default-site'])
    ]);

    const [sections, trajetoria, customSections, missaoVisao] = await Promise.all([
      client.query(`
        SELECT s.*, array_agg(si.content) as items
        FROM sections s
        LEFT JOIN section_items si ON s.id = si.section_id
        WHERE s.site_id = $1
        GROUP BY s.id, s.type, s.description
      `, ['default-site']),
      client.query('SELECT * FROM trajetoria_items WHERE site_id = $1', ['default-site']),
      client.query(`
        SELECT cs.*, array_agg(csi.content) as items
        FROM custom_sections cs
        LEFT JOIN custom_section_items csi ON cs.id = csi.custom_section_id
        WHERE cs.site_id = $1
        GROUP BY cs.id, cs.slug, cs.title, cs.description
      `, ['default-site']),
      client.query(`
        SELECT mvv.*, array_agg(v.value) as valores
        FROM missoes_visoes_valores mvv
        LEFT JOIN valores v ON mvv.id = v.missao_visao_id
        WHERE mvv.site_id = $1
        GROUP BY mvv.id, mvv.missao, mvv.visao, mvv.site_id
      `, ['default-site'])
    ]);


    // Mapear para nested SiteConfig compatível frontend/Zod
    const nestedConfig = {
      identity: identity.rows[0] || { name: '', subtitle: '', crp: '' },
      hero: { description: hero.rows[0]?.description || '' },
      customPhoto: photo.rows[0]?.photo || '',
      sobre: sobre.rows[0] || { card1Title: '', card1Text: '', card2Title: '', card2Text: '' },
      comoAjudar: sections.rows.find((s: any) => s.type === 'COMO_AJUDAR') || { description: '', items: [] },
      condicoesAtendidas: sections.rows.find((s: any) => s.type === 'CONDICOES_ATENDIDAS') || { description: '', items: [] },
      recursosTerapeuticos: sections.rows.find((s: any) => s.type === 'RECURSOS_TERAPEUTICOS') || { description: '', items: [] },
      conteudos: sections.rows.find((s: any) => s.type === 'CONTEUDOS') || { description: '', items: [] },
      trajetoria: {
        aulas: trajetoria.rows.filter((t: any) => t.category === 'aulas').map((t: any) => t.content),
        palestras: trajetoria.rows.filter((t: any) => t.category === 'palestras').map((t: any) => t.content),
        publicacoes: trajetoria.rows.filter((t: any) => t.category === 'publicacoes').map((t: any) => t.content),
        experiencias: trajetoria.rows.filter((t: any) => t.category === 'experiencias').map((t: any) => t.content),
      },
      missaoVisaoValores: missaoVisao.rows[0] || { missao: '', visao: '', valores: [] },
      contato: contato.rows[0] || { email: '', telefone: '', instagram: '', linkedin: '' },
      navbar: navbar.rows.map((n: any) => n.title),
      colors: site.colors || {},
      customSections: Object.fromEntries(
        customSections.rows.map((cs: any) => [
          cs.slug,
          { title: cs.title, description: cs.description || '', items: cs.items || [] }
        ])
      ),
    };


res.json({
      config: nestedConfig,
      colors: nestedConfig.colors,
      photo: nestedConfig.customPhoto || null,
      sections: nestedConfig.customSections,
      updatedAt: site.updated_at
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar config' });
  } finally {
    client.release();
  }
});

// POST /api/login
router.post('/login', async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const { username, password } = LoginSchema.parse(req.body);
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && user.password === password) {
      res.json({
        success: true,
        user: { id: user.id, username: user.username, role: user.role }
      });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Erro na autenticação' });
  } finally {
    client.release();
  }
});

// PUT /api/config - Salvar raw SQL
router.put('/config', async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const data = SiteConfigSchema.parse(req.body);
    const siteId = 'default-site';

    // Site/colors
    await client.query(
      `INSERT INTO sites (id, colors) VALUES ($1, $2)
       ON CONFLICT (id) DO UPDATE SET colors = $2, updated_at = CURRENT_TIMESTAMP`,
      [siteId, data.colors]
    );

    // Helper function upsert
    const upsert = async (table: string, fields: string[], values: any[], where: string, whereVal: string) => {
      const setClause = fields.slice(1).map((f, i) => `${f} = $${i+3}`).join(', ');
      await client.query(
        `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map((_, i) => `$${i+1}`).join(', ')})
         ON CONFLICT (${where}) DO UPDATE SET ${setClause}`,
        [whereVal, ...values.slice(1)]
      );
    };

    // Identity, Hero, Photo, Sobre, Contato
    await upsert('identities', ['site_id', 'name', 'subtitle', 'crp'], [data.identity], 'site_id', siteId);
    await upsert('heroes', ['site_id', 'description'], [data.hero.description], 'site_id', siteId);
    await upsert('site_photos', ['site_id', 'photo'], [data.customPhoto || null], 'site_id', siteId);
    await upsert('sobre', ['site_id', 'card1_title', 'card1_text', 'card2_title', 'card2_text'],
      [data.sobre], 'site_id', siteId);
    await upsert('contatos', ['site_id', 'email', 'telefone', 'instagram', 'linkedin'],
      [data.contato], 'site_id', siteId);

    // Navbar - delete + insert
    await client.query('DELETE FROM navbar_items WHERE site_id = $1', [siteId]);
    if (data.navbar.length > 0) {
      const navbarValues = data.navbar.map((title: string) => [title, siteId]);
      await client.query(
        'INSERT INTO navbar_items (title, site_id) VALUES ' + navbarValues.map((_, i) => `($${i*2+1}, $${i*2+2})`).join(', '),
        ...navbarValues.flat()
      );
    }

    // Commit e sucesso
    await client.query('COMMIT');
    res.json({ success: true, message: '✅ Dados salvos no PostgreSQL!' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao salvar' });
  } finally {
    client.release();
  }
});

export default router;
