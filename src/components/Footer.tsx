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
    <footer id="contato" className="relative overflow-hidden">
      {/* Decorative wave top */}
      <svg className="w-full -mb-1" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,120 C240,40 480,100 720,50 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
          fill="hsl(280 20% 96%)"
        />
        <path
          d="M0,120 C360,30 720,90 1080,40 C1260,15 1380,70 1440,50 L1440,120 L0,120 Z"
          className="fill-primary"
          opacity="0.15"
        />
        <path
          d="M0,80 C240,120 480,60 720,90 C960,120 1200,60 1440,80 L1440,120 L0,120 Z"
          className="fill-primary"
        />
      </svg>

      <div className="bg-primary relative">
        {/* Decorative organic shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary/20 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/10 blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <h2 className="font-heading text-2xl font-semibold text-primary-foreground mb-8 text-center">Contato</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm group">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <Mail size={16} />
              </div>
              {email}
            </a>
            <a href={`tel:${telefone}`} className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm group">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <Phone size={16} />
              </div>
              {telefone}
            </a>
            <a href={`https://instagram.com/${instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm group">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <Instagram size={16} />
              </div>
              {instagram}
            </a>
            <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-body text-sm group">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <Linkedin size={16} />
              </div>
              {linkedin}
            </a>
          </div>
          <div className="w-24 h-px bg-primary-foreground/20 mx-auto mb-6" />
          <p className="text-center text-primary-foreground/60 font-body text-xs">
            © {new Date().getFullYear()} {name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
