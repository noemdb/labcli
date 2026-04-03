import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TESTIMONIALS } from "@/lib/constants/lab";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Lo que dicen de nosotros
          </h2>
          <p className="text-lg text-muted-foreground">
            La confianza de nuestros pacientes y médicos referidores es nuestro
            mayor respaldo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => {
            const initials = testimonial.author
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (
              <Card key={testimonial.id} className="bg-card/50 border-0 shadow-sm relative pt-8 mt-4 hover:shadow-md transition-shadow">
                <div className="absolute -top-6 left-6">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                    <Quote className="w-6 h-6 fill-current" />
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="text-foreground/90 italic mb-8 relative z-10 leading-relaxed text-lg">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                      <AvatarImage src="/images/placeholder-user.jpg" alt={testimonial.author} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
