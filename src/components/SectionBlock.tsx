import { Heart } from "lucide-react";

interface SectionBlockProps {
  id: string;
  title: string;
  description: string;
  items: string[];
  variant?: "default" | "accent" | "muted";
}

const variantStyles = {
  default: "bg-background",
  accent: "bg-accent/30",
  muted: "bg-muted/40",
};

export default function SectionBlock({ id, title, description, items, variant = "default" }: SectionBlockProps) {
  return (
    <section id={id} className={`py-20 relative overflow-hidden ${variantStyles[variant]}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">{title}</h2>
          <div className="w-16 h-1 bg-primary/40 rounded-full mx-auto mb-6" />
          <p className="font-body text-foreground/80 max-w-2xl mx-auto leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mt-0.5 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart size={14} className="text-primary" />
              </div>
              <p className="font-body text-sm text-card-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
