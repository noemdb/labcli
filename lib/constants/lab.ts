/**
 * Datos institucionales del laboratorio. Actualizar aquí al cambiar de cliente.
 */

export const LAB = {
  name: "Laboratorio Clínico SCO C.A.",
  shortName: "SCO Laboratorio",
  tagline: "Resultados precisos. Atención humana.",
  phone: "+58 212-555-0100",
  whatsapp: "584121234567",
  email: "info@labsco.com.ve",
  address: "Av. Principal, La Guaira, Estado La Guaira, Venezuela",
  schedule: "Lun–Vie 7:00 AM – 5:00 PM | Sáb 7:00 AM – 12:00 PM",
  social: {
    instagram: "https://instagram.com/labsco",
    facebook: "https://facebook.com/labsco",
  },
  /** Sustituir por foto JPG propia (p. ej. hero-bg.jpg) cuando esté disponible. */
  heroImageSrc: "/images/lab/hero-bg.png",
  heroImageAlt:
    "Ambiente de laboratorio clínico con iluminación profesional y tonos azul profundo",
} as const;

export const SERVICES = [
  {
    id: "hematologia",
    title: "Hematología",
    description:
      "Hemograma completo, velocidad de sedimentación, coagulación y perfil hematológico.",
    icon: "Droplets",
  },
  {
    id: "quimica-clinica",
    title: "Química Clínica",
    description:
      "Glucosa, urea, creatinina, perfil lipídico, enzimas hepáticas y función renal.",
    icon: "FlaskConical",
  },
  {
    id: "microbiologia",
    title: "Microbiología",
    description:
      "Cultivos, antibiogramas, urocultivos y estudios parasitológicos.",
    icon: "Microscope",
  },
  {
    id: "inmunologia",
    title: "Inmunología y Serología",
    description:
      "VDRL, VIH, hepatitis B y C, toxoplasma, rubéola y panel tiroideo.",
    icon: "Shield",
  },
  {
    id: "urinalisis",
    title: "Urianálisis",
    description:
      "Examen general de orina, sedimento urinario y depuración de creatinina.",
    icon: "TestTube",
  },
  {
    id: "hormonas",
    title: "Endocrinología",
    description:
      "TSH, T3, T4, cortisol, insulina, prolactina y perfil hormonal completo.",
    icon: "Activity",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Solicita tu cita",
    description:
      "Llámanos o completa el formulario en línea. Te confirmamos tu cita en menos de 2 horas.",
    icon: "CalendarDays",
  },
  {
    step: 2,
    title: "Prepárate correctamente",
    description:
      "Te enviamos instrucciones específicas de ayuno o preparación según los análisis solicitados.",
    icon: "ClipboardList",
  },
  {
    step: 3,
    title: "Toma de muestra",
    description:
      "Personal certificado realiza la extracción con equipos estériles de un solo uso.",
    icon: "Syringe",
  },
  {
    step: 4,
    title: "Análisis en laboratorio",
    description:
      "Procesamos tus muestras con equipos de última generación y control de calidad interno.",
    icon: "Microscope",
  },
  {
    step: 5,
    title: "Resultados verificados",
    description:
      "Nuestro bioanalista revisa y valida cada resultado antes de entregarlo.",
    icon: "CheckCircle2",
  },
  {
    step: 6,
    title: "Entrega de resultados",
    description: "Retira en sede o recíbelos digitalmente en el tiempo acordado.",
    icon: "FileText",
  },
] as const;

export const METRICS = [
  { value: "15+", label: "Años de trayectoria" },
  { value: "50K+", label: "Pacientes atendidos" },
  { value: "200+", label: "Tipos de análisis" },
  { value: "24h", label: "Tiempo de entrega promedio" },
] as const;

export const WHY_US = [
  {
    title: "Equipamiento de última generación",
    description:
      "Analizadores automatizados calibrados diariamente con estándares internacionales.",
    icon: "Gauge",
  },
  {
    title: "Personal certificado",
    description:
      "Bioanalistas, técnicos y personal de salud con certificación vigente y capacitación continua.",
    icon: "Award",
  },
  {
    title: "Resultados rápidos y precisos",
    description:
      "Tiempos de entrega predecibles con valores de referencia actualizados por edad y sexo.",
    icon: "Timer",
  },
  {
    title: "Confidencialidad garantizada",
    description:
      "Tus resultados son estrictamente privados. Solo tú y tu médico pueden acceder a ellos.",
    icon: "Lock",
  },
] as const;

/** REEMPLAZAR con testimonios reales antes de go-live. */
export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Los resultados llegaron el mismo día y el personal me explicó cada valor con paciencia.",
    author: "María González",
    role: "Paciente",
  },
  {
    id: "2",
    quote:
      "Referimos pacientes desde hace años: tiempos de respuesta confiables y trazabilidad clara.",
    author: "Dr. Carlos Méndez",
    role: "Médico tratante",
  },
  {
    id: "3",
    quote:
      "Proceso ordenado, instalaciones limpias y atención respetuosa en cada visita.",
    author: "Ana Rivas",
    role: "Paciente",
  },
] as const;

export type ServiceItem = (typeof SERVICES)[number];
