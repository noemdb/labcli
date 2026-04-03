import { LAB } from "@/lib/constants/lab";
import { Activity, Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-16 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Col 1: Marca y Descripción */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Activity className="w-6 h-6" />
              <span className="font-semibold text-lg text-foreground tracking-tight">
                {LAB.shortName}
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              {LAB.tagline}
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href={LAB.social.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={LAB.social.facebook} 
                target="_blank" 
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Enlaces Rápidos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Secciones</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-primary transition-colors">Proceso</a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-primary transition-colors">Nosotros</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Datos de Contacto */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href={`tel:${LAB.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary transition-colors">
                  {LAB.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href={`mailto:${LAB.email}`} className="hover:text-primary transition-colors">
                  {LAB.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{LAB.address}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Horario */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Horario</h3>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="whitespace-pre-line">{LAB.schedule.replace(" | ", "\n")}</span>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-background border border-border">
              <p className="text-xs font-medium text-foreground text-center">
                Laboratorio Clínico Certificado
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} {LAB.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Términos legales</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
