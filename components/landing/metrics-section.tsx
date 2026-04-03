import { METRICS } from "@/lib/constants/lab";

export function MetricsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
          {METRICS.map((metric, i) => (
            <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0">
              <span className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-2 drop-shadow-sm">
                {metric.value}
              </span>
              <span className="text-sm md:text-base font-medium opacity-90">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
