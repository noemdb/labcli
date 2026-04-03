import { PROCESS_STEPS } from "@/lib/constants/lab";
import * as Icons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function ProcessSection() {
  return (
    <section id="proceso" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-foreground line-reveal">
            Nuestro <span className="text-primary font-bold">Proceso</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Un flujo de trabajo diseñado para su comodidad, garantizando la mayor 
            precisión en sus resultados desde la toma de muestra hasta la entrega final.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Sticky Image on the Left */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(var(--primary),0.15)] hover:shadow-[0_0_60px_rgba(var(--primary),0.3)] transition-shadow duration-700 group">
              <Image 
                src="/images/lab/process-sample.png" 
                alt="Process Sample Analysis"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-primary hover:bg-primary text-black mb-3 text-sm px-3 py-1 font-semibold border-none rounded-full">
                  Alta Precisión
                </Badge>
                <p className="text-white font-medium drop-shadow-md">
                  Tecnología robótica de punta para minimizar el error humano y maximizar la confiabilidad.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline on the Right */}
          <div className="w-full lg:w-7/12 relative">
            <div className="absolute left-6 lg:left-8 top-4 bottom-4 w-px bg-border/50" />
            
            <div className="space-y-12">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = Icons[step.icon as keyof typeof Icons] as React.ElementType;

                return (
                  <div key={step.step} className="relative flex gap-6 hover-lift group">
                    <div className="relative shrink-0 mt-1">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-colors" />
                      <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-background border border-primary/30 text-primary shadow-sm z-10 font-bold text-lg lg:text-xl group-hover:scale-110 transition-transform duration-300">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-8 hover:bg-card hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary shrink-0">
                          {Icon ? <Icon className="w-5 h-5" /> : <Icons.Circle className="w-5 h-5" />}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground tracking-tight">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
