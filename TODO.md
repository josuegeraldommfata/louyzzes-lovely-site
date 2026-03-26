# TODO: Implementar Banco de Dados para Dashboard Admin

## ✅ Passos Concluídos
- [x] Analisar dashboard Admin.tsx e mockData.ts
- [x] Criar schema.prisma com models normalizados
- [x] Gerar migration SQL para tabelas

## 🔄 Progresso Atual
- [ ] Executar migração Prisma
- [ ] Atualizar seed.ts
- [ ] Testar endpoints API

## ⏳ Próximos Passos
1. Executar: `cd backend && npx prisma migrate dev --name create-site-tables`
2. `npx prisma generate`
3. Popular seed: `npx prisma db seed`
4. Testar Admin dashboard: login admin/admin123, editar/salvar configs
5. Atualizar routes/api para usar relational queries (fetchConfig/saveConfig)

## Notas
- Site ID único: 'default-site'
- Models normalizados para listas (Section/SectionItem)
- Cores como Json por simplicidade (HSL strings)
- Custom sections com slug único

