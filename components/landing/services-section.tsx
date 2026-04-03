import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants/lab";
import * as Icons from "lucide-react";
import Image from "next/image";

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 how-it-works-bg noise-overlay relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-foreground line-reveal">
            Nuestros <span className="word-gradient drop-shadow-sm">Servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-in fade-in duration-700 delay-200">
            Ofrecemos un amplio catálogo de pruebas de laboratorio con los más altos
            estándares de calidad y precisión para cuidar de su salud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = Icons[service.icon as keyof typeof Icons] as React.ElementType;
            
            return (
              <Card 
                key={service.id} 
                className="group border-foreground/5 bg-background/50 backdrop-blur-xl hover:bg-card hover-lift transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader>
                  <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-500">
                    {Icon ? <Icon className="w-7 h-7" /> : <Icons.Activity className="w-7 h-7" />}
                  </div>
                  <CardTitle className="text-xl font-display tracking-wide">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground/80 leading-relaxed group-hover:text-muted-foreground transition-colors">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
