import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LAB } from "@/lib/constants/lab";
import { DNAWrapper } from "./dna-wrapper";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-start overflow-hidden bg-black noise-overlay">
      {/* 3D WebGL Background Container */}
      <div className="absolute inset-0 z-0">
        <DNAWrapper />
        {/* Gradients for contrast - stay static over the rotating image */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90 z-[1] pointer-events-none" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-primary/20"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-primary/20"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-32 lg:py-40 mt-16 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          {/* Eyebrow badge */}
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both hover-lift">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 border-none transition-colors backdrop-blur-sm">
              ✨ Laboratorio Clínico Certificado
            </Badge>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-display tracking-tight text-white leading-[1.05] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both line-reveal">
            <span className="block">{LAB.name}</span>
            <span className="block mt-2">
              Precisión <span className="word-gradient font-bold drop-shadow-sm">sin demoras</span>.
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both max-w-[650px] leading-relaxed drop-shadow-sm">
            {LAB.tagline} Análisis clínicos con tecnología de vanguardia y tiempos de entrega predecibles, directo a su disposición.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
            <Button size="lg" className="rounded-full text-base px-8 h-14 w-full sm:w-auto shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all pointer-events-auto" asChild>
              <a href="#contacto">Solicitar cita ahora</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-14 w-full sm:w-auto bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-background/40 hover:text-white pointer-events-auto" asChild>
              <a href="#servicios">Explorar servicios</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
