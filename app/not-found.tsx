import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { LAB } from "@/lib/constants/lab";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="bg-primary/10 p-4 rounded-full text-primary mb-8 animate-pulse">
        <Activity className="w-12 h-12" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
        Página no encontrada
      </h2>
      <p className="text-lg text-muted-foreground max-w-md mx-auto mb-10">
        Lo sentimos, no pudimos encontrar la página que estás buscando. 
        Puede que haya sido movida o la dirección sea incorrecta.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/">
            Volver al inicio
          </Link>
        </Button>
      </div>
      <div className="mt-16 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {LAB.name}
      </div>
    </div>
  );
}
