"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Activity } from "lucide-react";
import { LAB } from "@/lib/constants/lab";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navLinks = [
  { name: "Servicios",  href: "#servicios" },
  { name: "Proceso",    href: "#proceso" },
  { name: "Nosotros",   href: "#nosotros" },
  { name: "Contacto",   href: "#contacto" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled
          ? "bg-orange-600/[0.08] backdrop-blur-xl border-orange-500/20 shadow-[0_8px_32px_rgba(249,115,22,0.05)] py-3"
          : "bg-orange-500/[0.02] border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleScrollTo(e, "#")}
          className="flex items-center gap-2 group"
          aria-label="Volver al inicio"
        >
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <Activity className="w-6 h-6" />
          </div>
          <span className={`font-semibold tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-primary"}`}>
            {LAB.shortName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? "text-foreground/80" : "text-foreground/90"
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="rounded-full px-6" 
            onClick={() => {
              const elem = document.getElementById("contacto");
              if (elem) elem.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Solicitar cita
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <VisuallyHidden>
                <SheetTitle>Menú de navegación</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="font-semibold">{LAB.shortName}</span>
                </div>
                
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                
                <div className="mt-4">
                  <SheetClose asChild>
                    <Button 
                      className="w-full rounded-full"
                      onClick={() => {
                        const elem = document.getElementById("contacto");
                        if (elem) {
                          setTimeout(() => {
                            elem.scrollIntoView({ behavior: "smooth" });
                          }, 150);
                        }
                      }}
                    >
                      Solicitar cita
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
