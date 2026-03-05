import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  email: string;
  telefone: string;
  instagram: string;
  linkedin: string;
  name: string;
}

export default function Footer({ email, telefone, instagram, linkedin, name }: FooterProps) {
  return (
    <footer id="contato" className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl font-semibold text-primary-foreground mb-8 text-center">Contato</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <a href={`mailto:${email}`} className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm">
            <Mail size={18} /> {email}
          </a>
          <a href={`tel:${telefone}`} className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm">
            <Phone size={18} /> {telefone}
          </a>
          <a href={`https://instagram.com/${instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm">
            <Instagram size={18} /> {instagram}
          </a>
          <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm">
            <Linkedin size={18} /> {linkedin}
          </a>
        </div>
        <p className="text-center text-primary-foreground/60 font-body text-xs">
          © {new Date().getFullYear()} {name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
