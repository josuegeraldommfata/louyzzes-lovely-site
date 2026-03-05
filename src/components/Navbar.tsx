import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  items: string[];
}

const sectionIds: Record<string, string> = {
  "Início": "inicio",
  "Quem Sou Eu": "sobre",
  "Como Posso Te Ajudar": "sobre",
  "Condições Atendidas": "trajetoria",
  "Recursos Terapêuticos": "trajetoria",
  "Conteúdos": "missao",
  "Contato": "contato",
};

export default function Navbar({ items }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const scrollTo = (item: string) => {
    const id = sectionIds[item] || "inicio";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <span className="font-heading text-lg font-semibold text-primary">LM</span>

        {/* Desktop */}
        <ul className="hidden md:flex gap-6">
          {items.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item)}
                className="text-sm font-body text-foreground hover:text-primary transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border">
          <ul className="flex flex-col py-4 px-6 gap-3">
            {items.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  className="text-sm font-body text-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
