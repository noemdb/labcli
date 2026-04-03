import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { ProcessSection } from "@/components/landing/process-section";
import { WhyUsSection } from "@/components/landing/why-us-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { FooterSection } from "@/components/landing/footer-section";
import { SERVICES } from "@/lib/constants/lab";
import dynamic from "next/dynamic";

const TestimonialsSection = dynamic(
  () => import("@/components/landing/testimonials-section").then(mod => mod.TestimonialsSection),
  { loading: () => <div className="h-64 animate-pulse bg-muted w-full" /> }
);

const ContactSection = dynamic(
  () => import("@/components/landing/contact-section").then(mod => mod.ContactSection),
  { loading: () => <div className="h-96 animate-pulse bg-muted/50 w-full" /> }
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WhyUsSection />
      <MetricsSection />
      <TestimonialsSection />
      <ContactSection services={SERVICES} />
      <FooterSection />
    </main>
  );
}
