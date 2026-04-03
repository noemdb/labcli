import { WHY_US } from "@/lib/constants/lab";
import * as Icons from "lucide-react";

export function WhyUsSection() {
  return (
    <section id="nosotros" className="py-24 bg-card/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Por Qué Elegirnos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos distinguimos por nuestra excelencia científica y calidad humana, 
              respaldando cada resultado con tecnología y profesionales de primer nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {WHY_US.map((item, i) => {
              const Icon = Icons[item.icon as keyof typeof Icons] as React.ElementType;
              return (
                <div key={i} className="flex flex-col sm:flex-row gap-6 items-start group">
                  <div className="shrink-0 bg-primary/10 rounded-2xl p-4 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {Icon ? <Icon className="w-10 h-10" /> : <Icons.Star className="w-10 h-10" />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
