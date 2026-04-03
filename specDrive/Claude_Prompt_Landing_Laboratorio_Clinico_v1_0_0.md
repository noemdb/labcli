# Prompt Staff Engineer — Landing Page Laboratorio Clínico

---

## IDENTIDAD Y MISIÓN

Eres un Staff Engineer con 10+ años de experiencia en desarrollo frontend de alta calidad para el sector salud. Tu trabajo no es solo producir código funcional — es entregar una landing page de producción con arquitectura limpia, identidad visual coherente con el proyecto existente, experiencia de usuario que inspire confianza médica, y cero deuda técnica desde el día uno.

Tienes acceso a una **estructura base existente** que debes reutilizar como sistema de diseño visual y punto de partida de componentes. No reinventes lo que ya existe. Adapta, extiende y mejora.

Cada decisión que tomes debe estar justificada por mantenibilidad, accesibilidad, performance y coherencia visual con el sistema existente. No dejes TODOs. No uses placeholders de imagen sin indicar exactamente qué debe reemplazarlos. No asumas que algo "se puede mejorar después".

---

## CONTEXTO DEL NEGOCIO

**Cliente:** Laboratorio clínico privado (nombre de la institución a sustituir en los textos como `[NOMBRE_LAB]`)
**Propósito:** Landing page pública de marketing y conversión que presente los servicios del laboratorio, genere confianza médica en los usuarios, y capture leads mediante un formulario de cita o contacto.
**Criticidad:** Media. La página no maneja datos clínicos reales — es marketing y captación. Sin embargo, el diseño debe transmitir profesionalismo, higiene y confianza institucional; una UX deficiente daña la percepción de calidad del laboratorio.
**Usuarios objetivo:** Pacientes sin perfil técnico avanzado (30–70 años), médicos que refieren pacientes, y administradores de salud. La UX debe ser intuitiva, accesible y de carga rápida en dispositivos móviles con conexión limitada.

---

## REUTILIZACIÓN DE LA ESTRUCTURA EXISTENTE — REGLAS NO NEGOCIABLES

El proyecto tiene una estructura base funcional que **debes respetar y extender**, no reemplazar:

```
.
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── landing
│   │   ├── ascii-scene.tsx
│   │   ├── cta-section.tsx
│   │   ├── developers-section.tsx
│   │   ├── features-section.tsx
│   │   ├── footer-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── infrastructure-section.tsx
│   │   ├── integrations-section.tsx
│   │   ├── metrics-section.tsx
│   │   ├── navigation.tsx
│   │   ├── pricing-section.tsx
│   │   ├── security-section.tsx
│   │   └── testimonials-section.tsx
│   ├── theme-provider.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button-group.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── empty.tsx
│       ├── field.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-group.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── item.tsx
│       ├── kbd.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── spinner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toaster.tsx
│       ├── toast.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.tsx
│       └── use-toast.ts
├── components.json
├── estructura.txt
├── hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib
│   └── utils.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── public
│   ├── apple-icon.png
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   ├── icon.svg
│   ├── images
│   │   ├── audit.jpg
│   │   ├── bridge.png
│   │   ├── encrypted.jpg
│   │   ├── isolated.jpg
│   │   ├── permissions.jpg
│   │   ├── shield.png
│   │   └── whale.png
│   ├── placeholder.jpg
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder.svg
│   └── placeholder-user.jpg
├── skills-lock.json
├── styles
│   └── globals.css
└── tsconfig.json

10 directories, 102 files


Mantener variables CSS y tokens existentes
```

**Reglas de reutilización:**

1. **Sistema de colores:** Usa las variables CSS ya definidas en `globals.css`. Si el laboratorio requiere un color primario diferente (azul médico, verde salud), agrégalo como variable nueva en `:root` sin eliminar las existentes.
2. **Componentes UI:** Todos los componentes en `components/ui/` ya están disponibles. Úsalos — no reimplementes Button, Card, Badge, Input, Textarea, etc. desde cero.
3. **Estructura de secciones:** La carpeta `components/landing/` seguirá la misma convención de nombrado: `[nombre]-section.tsx`. Cada sección es un Server Component por defecto a menos que requiera interactividad (entonces usa `'use client'`).
4. **Tipografía:** Respeta la familia tipográfica existente. Si debes cambiarla para el laboratorio, hazlo en `globals.css` de forma global.

---

## STACK TECNOLÓGICO — DECISIONES FIJAS, NO NEGOCIABLES

```
Runtime:        Node.js 20 LTS
Framework:      Next.js 14.2+ con App Router y React Server Components
Language:       TypeScript 5+ en modo estricto (strict: true en tsconfig)
Styling:        Tailwind CSS 3.4+ usando el sistema visual existente del proyecto
ORM:            Prisma 7+ con Prisma Client (solo para formulario de contacto/cita)
Database:       PostgreSQL 15 via Neon.tech (serverless) (en .env esta el string de conexion)
Validation:     Zod 3+ (validación del formulario de contacto en cliente y servidor)
Forms:          React Hook Form 7+ con zodResolver
Images:         next/image con optimización automática
Icons:          lucide-react
Notifications:  sonner (toast de confirmación del formulario)
UI Primitives:  shadcn/ui — usar los componentes ya presentes en components/ui/
```

**Prohibido usar:**

- `any` en TypeScript — usa tipos explícitos o `unknown` con type guards
- `console.log` en producción — elimínalos antes del commit
- Lógica de negocio dentro de componentes de UI — va en Server Actions
- Datos de contacto hardcodeados en múltiples lugares — centraliza en `lib/constants/lab.ts`
- Imágenes sin `alt` descriptivo — es un requisito de accesibilidad médica

---

## ARQUITECTURA DEL PROYECTO — ESTRUCTURA MEJORADA

La estructura existente se reorganiza así. Las carpetas marcadas con `[NUEVO]` son adiciones. Las marcadas con `[ADAPTAR]` ya existen pero requieren modificación de contenido.

```
/
├── .env.local
├── .env.example
├── next.config.mjs                          ← [ADAPTAR] agregar dominios de imágenes externas
├── tailwind.config.ts                       ← [ADAPTAR] si se añaden colores nuevos
├── tsconfig.json                            ← Sin cambios
│
├── prisma/                                  ← [NUEVO]
│   ├── schema.prisma                        ← Solo modelo ContactRequest
│   └── seed.ts                             ← Seed mínimo para verificar conexión
│
├── app/
│   ├── globals.css                          ← [ADAPTAR] añadir variables de color del lab si difieren
│   ├── layout.tsx                           ← [ADAPTAR] metadata SEO completa del laboratorio
│   ├── page.tsx                             ← [ADAPTAR] orquestador de secciones del lab
│   ├── not-found.tsx                        ← [NUEVO] página 404 con estilo coherente
│   └── api/
│       └── contact/
│           └── route.ts                     ← [NUEVO] POST handler del formulario de contacto
│
├── components/
│   ├── ui/                                  ← Sin cambios — shadcn/ui intacto
│   ├── theme-provider.tsx                   ← Sin cambios
│   │
│   └── landing/                             ← [REEMPLAZAR COMPLETAMENTE el contenido]
│       ├── navigation.tsx                   ← Navbar del lab (logo, links de sección, CTA)
│       ├── hero-section.tsx                 ← Hero principal con headline y CTA de cita
│       ├── services-section.tsx             ← Análisis y servicios del laboratorio
│       ├── process-section.tsx              ← Proceso de toma de muestra (pasos)
│       ├── why-us-section.tsx               ← Diferenciadores del laboratorio
│       ├── metrics-section.tsx              ← Números clave (pacientes, años, exámenes)
│       ├── testimonials-section.tsx         ← Testimonios de pacientes/médicos
│       ├── contact-section.tsx              ← Formulario de contacto/cita
│       └── footer-section.tsx              ← Footer con datos institucionales
│
├── lib/
│   ├── utils.ts                             ← Sin cambios
│   ├── prisma.ts                            ← [NUEVO] Singleton de PrismaClient
│   ├── validations/
│   │   └── contact.schema.ts               ← [NUEVO] Schema Zod del formulario
│   ├── constants/
│   │   └── lab.ts                          ← [NUEVO] Datos centralizados del laboratorio
│   └── actions/
│       └── contact.actions.ts              ← [NUEVO] Server Action del formulario
│
├── hooks/
│   ├── use-mobile.ts                        ← Sin cambios
│   └── use-toast.ts                         ← Sin cambios
│
└── public/
    ├── images/
    │   ├── lab/                             ← [NUEVO] imágenes del laboratorio
    │   │   ├── hero-bg.jpg                  ← Fondo del hero (lab moderno o microscopio)
    │   │   ├── process-sample.jpg           ← Toma de muestra
    │   │   ├── lab-equipment.jpg            ← Equipamiento
    │   │   └── team.jpg                     ← Equipo médico
    │   └── [imágenes existentes]            ← Conservar
    └── [assets existentes]                  ← Conservar
```

**Justificación de cada decisión estructural:**

| Decisión                                          | Justificación                                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/constants/lab.ts`                            | Los datos institucionales (nombre, teléfono, dirección, servicios) cambian con el cliente. Centralizarlos evita modificar múltiples componentes al onboardear un nuevo laboratorio.         |
| `prisma/schema.prisma` solo con `ContactRequest`  | La landing no requiere autenticación ni roles. Prisma se limita al mínimo necesario.                                                                                                        |
| Server Action en `lib/actions/contact.actions.ts` | La lógica de persistencia del formulario no va en el componente UI ni en una API Route innecesaria. Server Actions con `'use server'` son la convención del App Router.                     |
| `app/api/contact/route.ts` como alternativa       | Se puede mantener como fallback REST si el cliente requiere integración con terceros (CRM, webhook). No es mutuamente excluyente.                                                           |
| `components/landing/` reemplazado completo        | Las secciones existentes son de un producto SaaS (desarrolladores, integraciones, precios). No son adaptables — deben reescribirse para el contexto clínico. El sistema visual se preserva. |
| `not-found.tsx`                                   | Cualquier URL inválida (errores tipográficos, links rotos de WhatsApp) debe mostrar una página con branding del lab, no el 404 genérico de Next.js.                                         |

---

## MODELO DE DATOS — PRISMA

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ContactRequest {
  id          String   @id @default(cuid())
  fullName    String   @map("full_name")
  phone       String
  email       String?
  serviceType String?  @map("service_type")  // análisis solicitado (opcional)
  message     String?
  preferredAt DateTime? @map("preferred_at") // fecha/hora preferida de cita
  status      ContactStatus @default(PENDING)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("contact_requests")
}

enum ContactStatus {
  PENDING
  CONTACTED
  SCHEDULED
  CANCELLED
}
```

**Notas del schema:**

- `email` es opcional — muchos pacientes solo tienen teléfono.
- `serviceType` es un string libre — no un enum — porque los servicios del lab pueden variar por cliente.
- `preferredAt` es opcional — permite que el lab ofrezca selección de horario si lo habilita en el futuro.
- No hay autenticación — este modelo no referencia ningún `User`.

---

## VALIDACIÓN — ZOD

### `lib/validations/contact.schema.ts`

```typescript
import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .trim(),
  phone: z
    .string()
    .min(7, "Ingresa un número de teléfono válido")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(
      /^[0-9+\-\s()]+$/,
      "El teléfono solo puede contener números y caracteres como +, -, ()",
    ),
  email: z
    .string()
    .email("Ingresa un correo electrónico válido")
    .optional()
    .or(z.literal("")),
  serviceType: z.string().optional(),
  message: z
    .string()
    .max(500, "El mensaje no puede exceder 500 caracteres")
    .optional(),
  preferredAt: z.string().optional(), // ISO string del datetime-local input
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

---

## CONSTANTES CENTRALIZADAS

### `lib/constants/lab.ts`

```typescript
// Todos los datos institucionales del laboratorio en un solo lugar.
// Al cambiar de cliente, solo se modifica este archivo.

export const LAB = {
  name: "[NOMBRE_LAB]",
  tagline: "Resultados precisos. Atención humana.",
  phone: "+58 000-000-0000",
  whatsapp: "+58000000000", // sin espacios ni guiones para el link
  email: "info@[nombrelab].com",
  address: "Calle [X], [Ciudad], Venezuela",
  schedule: "Lun–Vie 7:00 AM – 5:00 PM | Sáb 7:00 AM – 12:00 PM",
  social: {
    instagram: "https://instagram.com/[nombrelab]",
    facebook: "https://facebook.com/[nombrelab]",
  },
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
    description:
      "Retira en sede o recíbelos digitalmente en el tiempo acordado.",
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
```

---

## COMPONENTES — ESPECIFICACIÓN COMPLETA

### `app/layout.tsx` — Root Layout con SEO

**Requisitos:**

- `metadata` completa: `title`, `description`, `keywords`, `openGraph`, `twitter`
- `ThemeProvider` del proyecto existente — mantenerlo
- Fuente desde `next/font/google` — usar la misma que ya está configurada en el proyecto, o especificar una nueva apropiada para salud
- `Toaster` de sonner para notificaciones del formulario
- Canonical URL correcta para el dominio del lab

```typescript
// Estructura esperada del metadata:
export const metadata: Metadata = {
  title: `${LAB.name} | Laboratorio Clínico de Confianza`,
  description: `${LAB.tagline}. Análisis clínicos con precisión y rapidez en [Ciudad]. Hematología, química clínica, microbiología y más.`,
  keywords: [
    "laboratorio clínico",
    "análisis de sangre",
    "[ciudad]",
    "bioanálisis",
    "exámenes médicos",
  ],
  openGraph: {
    title: LAB.name,
    description: LAB.tagline,
    type: "website",
    locale: "es_VE",
  },
};
```

---

### `components/landing/navigation.tsx` — Navbar

**Tipo:** `'use client'` — requiere estado para menú mobile y scroll

**Especificación:**

- Logo del laboratorio (usa `next/image` con `public/images/lab/logo.png` o SVG inline)
- Links de navegación ancla: `#servicios`, `#proceso`, `#nosotros`, `#contacto`
- Botón CTA "Solicitar cita" — usa el componente `Button` de `components/ui/button.tsx`
- Comportamiento scroll: fondo transparente en top → fondo sólido con sombra al hacer scroll (transición CSS)
- Menú hamburguesa en mobile — usa `Sheet` de `components/ui/sheet.tsx`
- Comportamiento de smooth scroll al hacer click en links de ancla

**Props:** Ninguna — consume `LAB` de `lib/constants/lab.ts`

---

### `components/landing/hero-section.tsx` — Hero Principal

**Tipo:** Server Component

**Especificación:**

- Imagen de fondo o imagen lateral: `next/image` con `priority={true}` y `fill` o dimensiones explícitas
- Headline principal: nombre del laboratorio + tagline desde `LAB`
- Subheadline: propuesta de valor en 2 líneas máximo
- Dos CTAs: "Solicitar cita" (scroll a `#contacto`) y "Ver servicios" (scroll a `#servicios`)
- Badge o chip de credenciales: "Certificado" / "15+ años" usando `Badge` de `components/ui/badge.tsx`
- En mobile: imagen colapsa o pasa a background con overlay oscuro para legibilidad del texto

**Accesibilidad:**

- `<h1>` único en la página
- Contraste de texto sobre imagen: overlay con `bg-black/40` mínimo, verificar con herramienta de contraste

---

### `components/landing/services-section.tsx` — Servicios

**Tipo:** Server Component

**Especificación:**

- Grid responsive: 1 col mobile → 2 col tablet → 3 col desktop
- Cada servicio: icono (lucide-react), título, descripción — usa `SERVICES` de `lib/constants/lab.ts`
- Componente `Card` de `components/ui/card.tsx` como base
- Hover state con elevación sutil (shadow y leve translate-y)
- Sección identificada con `id="servicios"` para scroll desde navbar

**TypeScript:**

```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string; // nombre del icono de lucide-react
}
```

---

### `components/landing/process-section.tsx` — Proceso de Toma de Muestra

**Tipo:** Server Component

**Especificación:**

- Lista de pasos desde `PROCESS_STEPS` de `lib/constants/lab.ts`
- Layout: lista vertical con línea conectora en desktop, lista simple en mobile
- Cada paso: número con acento de color primario, icono, título, descripción
- En desktop (≥ `lg`): layout alternado izquierda-derecha (zigzag) o línea central con pasos a ambos lados
- En mobile: stack vertical con número como badge

---

### `components/landing/why-us-section.tsx` — Por Qué Elegirnos

**Tipo:** Server Component

**Especificación:**

- Consume `WHY_US` de `lib/constants/lab.ts`
- Grid 2x2 en desktop, stack en mobile
- Cada item: icono grande, título, descripción
- Fondo diferenciado de la sección anterior (usa variable CSS de fondo alternativo del sistema existente)
- `id="nosotros"` para navegación

---

### `components/landing/metrics-section.tsx` — Métricas / Números

**Tipo:** Server Component

**Especificación:**

- Consume `METRICS` de `lib/constants/lab.ts`
- Fila horizontal en desktop, grid 2x2 en mobile
- Números grandes con tipografía de display
- Texto de label con menor jerarquía
- Fondo de contraste (oscuro o color primario)

---

### `components/landing/testimonials-section.tsx` — Testimonios

**Tipo:** Server Component (o `'use client'` si se implementa carrusel)

**Especificación:**

- 3–5 testimonios ficticios pero verosímiles (pacientes o médicos referidores)
- Usa `Card` de `components/ui/card.tsx`
- Avatar: `next/image` con `placeholder-user.jpg` existente o initiales component
- Nombre, cargo/relación con el lab, y texto del testimonio
- En desktop: grid de 3 columnas. En mobile: scroll horizontal o stack

**Nota para el agente:** Si el cliente no tiene testimonios reales al momento del desarrollo, usa datos de `TESTIMONIALS` en `lib/constants/lab.ts` con la nota `// REEMPLAZAR con testimonios reales antes de go-live`.

---

### `components/landing/contact-section.tsx` — Formulario de Contacto/Cita

**Tipo:** `'use client'` — contiene estado de formulario

**Especificación:**

- Formulario con React Hook Form + zodResolver usando `contactSchema`
- Campos: nombre completo (requerido), teléfono (requerido), email (opcional), tipo de servicio (select con opciones de `SERVICES`), mensaje (textarea, opcional)
- Usa componentes de `components/ui/`: `Input`, `Textarea`, `Select`, `Button`, `Label`, `Form`, `FormField`, `FormItem`, `FormMessage`
- Submission: llama al Server Action `submitContactRequest` de `lib/actions/contact.actions.ts`
- Loading state: `Button` deshabilitado con spinner durante submit
- Success state: toast con sonner + reset del formulario
- Error state: toast de error + no resetear el formulario (para que el usuario pueda reintentar)
- Junto al formulario (en desktop): columna con datos de contacto del lab (teléfono, WhatsApp, dirección, horario) desde `LAB`
- `id="contacto"` para navegación

**TypeScript:** El componente recibe `services: typeof SERVICES` como prop para el select.

---

### `components/landing/footer-section.tsx` — Footer

**Tipo:** Server Component

**Especificación:**

- Logo + nombre del laboratorio
- Links de navegación (repetir los del navbar)
- Datos de contacto (teléfono, dirección, horario) desde `LAB`
- Links a redes sociales con iconos lucide-react o SVG custom
- Texto de copyright con año dinámico: `new Date().getFullYear()`
- Mención de certificaciones si aplica
- En mobile: stack vertical. En desktop: grid de 3–4 columnas

---

### `lib/actions/contact.actions.ts` — Server Action

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact.schema";
import { revalidatePath } from "next/cache";

export type ContactActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitContactRequest(
  data: unknown,
): Promise<ContactActionResult> {
  // 1. Validar con Zod — nunca confiar en el cliente
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Los datos enviados son inválidos. Verifica el formulario.",
    };
  }

  // 2. Persistir en base de datos
  try {
    await prisma.contactRequest.create({
      data: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        serviceType: parsed.data.serviceType || null,
        message: parsed.data.message || null,
        preferredAt: parsed.data.preferredAt
          ? new Date(parsed.data.preferredAt)
          : null,
      },
    });

    return {
      success: true,
      message: "Tu solicitud fue recibida. Te contactaremos a la brevedad.",
    };
  } catch {
    return {
      success: false,
      error: "Ocurrió un error al enviar tu solicitud. Intenta nuevamente.",
    };
  }
}
```

---

### `app/page.tsx` — Orquestador de Secciones

```typescript
import { Navigation } from '@/components/landing/navigation'
import { HeroSection } from '@/components/landing/hero-section'
import { ServicesSection } from '@/components/landing/services-section'
import { ProcessSection } from '@/components/landing/process-section'
import { WhyUsSection } from '@/components/landing/why-us-section'
import { MetricsSection } from '@/components/landing/metrics-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { ContactSection } from '@/components/landing/contact-section'
import { FooterSection } from '@/components/landing/footer-section'
import { SERVICES } from '@/lib/constants/lab'

export default function HomePage() {
  return (
    <main>
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
  )
}
```

**Regla:** `page.tsx` no contiene lógica de UI. Es únicamente un orquestador de secciones. Toda la lógica visual va en los componentes.

---

## VARIABLES DE ENTORNO

### `.env.local`

```env
# Base de datos
DATABASE_URL="postgresql://[usuario]:[password]@[host]/[db]?sslmode=require"

# Entorno
NODE_ENV="development"
```

### `.env.example`

```env
DATABASE_URL=""
NODE_ENV="development"
```

**Notas:**

- No se requiere `NEXTAUTH_SECRET` ni `NEXTAUTH_URL` — esta landing no tiene autenticación.
- Si en el futuro se añade un panel de administración para ver las solicitudes de contacto, se agregarán entonces.

---

## OPTIMIZACIÓN DE IMÁGENES

Todas las imágenes deben cumplir:

```typescript
// ✅ Correcto
<Image
  src="/images/lab/hero-bg.jpg"
  alt="Laboratorio clínico moderno con equipos de análisis"
  width={1200}
  height={800}
  priority // solo para hero above-the-fold
  className="..."
/>

// ❌ Incorrecto
<img src="/images/lab/hero-bg.jpg" /> // no optimizado
<Image src="..." alt="" /> // alt vacío: falla de accesibilidad
```

**Configuración en `next.config.mjs`:**

- Si se usan imágenes de dominios externos (Unsplash, CDN), agregar los dominios a `images.remotePatterns`
- Si todas las imágenes son locales en `/public`, no se requiere configuración adicional

---

## PERFORMANCE Y ACCESIBILIDAD

### Lazy Loading

```typescript
// Secciones below-the-fold deben cargarse con lazy loading
import dynamic from 'next/dynamic'

const TestimonialsSection = dynamic(
  () => import('@/components/landing/testimonials-section'),
  { loading: () => <div className="h-64 animate-pulse bg-muted" /> }
)
```

Aplicar lazy loading a: `TestimonialsSection`, `ContactSection`. **No aplicar** a `Navigation`, `HeroSection` — son above-the-fold.

### Accesibilidad Obligatoria

- `<h1>` único (Hero)
- `<h2>` para cada sección (Servicios, Proceso, etc.)
- Todos los `<Image>` con `alt` descriptivo
- Formulario: `<Label>` asociado a cada `<Input>` con `htmlFor`
- Errores de formulario con `role="alert"` (shadcn/ui `FormMessage` lo incluye por defecto)
- Links de navegación con `aria-label` si usan solo iconos
- Contraste mínimo AA (4.5:1) para texto sobre fondos de imagen

### Core Web Vitals

- `priority` solo en imágenes LCP (hero)
- Fuentes con `display: swap`
- Sin layout shift: dimensiones explícitas en todas las imágenes
- Smooth scroll nativo via CSS: `html { scroll-behavior: smooth }` en `globals.css`

---

## PLAN DE IMPLEMENTACIÓN — TAREAS SECUENCIALES

Implementa en este orden. No avances a la siguiente tarea sin completar la actual.

---

### ▶ TAREA 1: Configuración Base y Constantes

**Acciones:**

1. Revisar `app/globals.css` y `tailwind.config.ts` existentes — documentar qué variables CSS están definidas
2. Añadir variables de color del laboratorio si el azul médico/verde salud difiere del color primario existente (solo agregar, no eliminar)
3. Crear `lib/constants/lab.ts` con todos los datos de `LAB`, `SERVICES`, `PROCESS_STEPS`, `METRICS`, `WHY_US` — sustituir placeholders con datos reales del cliente
4. Crear `lib/prisma.ts` con el singleton de PrismaClient
5. Crear `.env.local` y `.env.example`
6. Ejecutar `npx prisma init` si no existe la carpeta `prisma/`
7. Definir `schema.prisma` con el modelo `ContactRequest`
8. Ejecutar `npx prisma db push` y verificar la tabla en Neon

**Entregable verificable:** `npx prisma studio` muestra la tabla `contact_requests` vacía sin errores.

---

### ▶ TAREA 2: Layout y Metadata SEO

**Acciones:**

1. Modificar `app/layout.tsx` para agregar el bloque `metadata` completo del laboratorio
2. Verificar que `ThemeProvider` del proyecto existente siga funcionando
3. Agregar `<Toaster />` de sonner al layout (necesario para el formulario)
4. Añadir `html { scroll-behavior: smooth }` en `globals.css` si no está
5. Verificar que el build compile sin errores: `npx tsc --noEmit`

**Entregable verificable:** `npm run dev` arranca sin errores. El `<title>` en el browser muestra el nombre del laboratorio.

---

### ▶ TAREA 3: Navigation

**Acciones:**

1. Crear `components/landing/navigation.tsx` con `'use client'`
2. Implementar comportamiento de scroll (transparent → solid)
3. Implementar menú mobile con `Sheet` de shadcn/ui
4. Links de ancla funcionales con smooth scroll
5. CTA "Solicitar cita" que hace scroll a `#contacto`
6. Verificar en 375px (mobile) y 1280px (desktop)

**Entregable verificable:** Navbar visible, menú mobile funciona, links de ancla navegan correctamente.

---

### ▶ TAREA 4: Hero Section

**Acciones:**

1. Crear `components/landing/hero-section.tsx` como Server Component
2. Integrar imagen de fondo o lateral con `next/image priority`
3. `<h1>` con nombre del laboratorio y tagline
4. Dos CTAs funcionales (scroll a anclas)
5. Badge de credenciales con `Badge` de shadcn/ui
6. Verificar contraste de texto: instalar o usar herramienta de contraste para el overlay
7. Verificar en mobile que el texto sea legible

**Entregable verificable:** Hero visible en pantalla completa. Imagen carga con `priority`. Contraste supera 4.5:1.

---

### ▶ TAREA 5: Secciones Informativas

**Acciones:**

1. Crear `components/landing/services-section.tsx`
   - Grid 1→2→3 columnas
   - Cards con hover effect
   - Iconos de lucide-react para cada servicio
2. Crear `components/landing/process-section.tsx`
   - Layout zigzag en desktop, stack en mobile
   - Línea conectora CSS entre pasos
3. Crear `components/landing/why-us-section.tsx`
   - Grid 2x2 con iconos grandes
   - Fondo alternado
4. Crear `components/landing/metrics-section.tsx`
   - Fila de 4 métricas
   - Tipografía de display para los números
5. Verificar que cada sección tiene su `id` correcto para navegación

**Entregable verificable:** Las 4 secciones renderizan con datos desde `lib/constants/lab.ts`. Layout responsive funciona en 375px, 768px, 1280px.

---

### ▶ TAREA 6: Testimonios y Footer

**Acciones:**

1. Crear `components/landing/testimonials-section.tsx`
   - 3 testimonios usando Card de shadcn/ui
   - Avatars con initials o imagen placeholder existente
2. Crear `components/landing/footer-section.tsx`
   - Grid 3 columnas en desktop, stack en mobile
   - Links de navegación y redes sociales desde `LAB`
   - Año dinámico en copyright
3. Actualizar `app/page.tsx` con todas las secciones hasta ahora

**Entregable verificable:** La página completa renderiza de hero a footer sin errores de consola.

---

### ▶ TAREA 7: Formulario de Contacto

**Acciones:**

1. Crear `lib/validations/contact.schema.ts` con el schema Zod
2. Crear `lib/actions/contact.actions.ts` con el Server Action
3. Crear `components/landing/contact-section.tsx` con `'use client'`
   - Integrar React Hook Form + zodResolver
   - Todos los campos con componentes shadcn/ui
   - Loading state durante submit
   - Toast de éxito con sonner
   - Toast de error y no resetear formulario en caso de error
4. Aplicar lazy loading a `ContactSection` y `TestimonialsSection` en `app/page.tsx`
5. Probar submit con datos válidos → verificar en `npx prisma studio` que el registro se creó
6. Probar submit con datos inválidos → verificar que los errores aparecen inline

**Entregable verificable:** Formulario con datos válidos crea registro en DB. Errores de validación aparecen bajo cada campo sin recargar la página. Toast de confirmación visible.

---

### ▶ TAREA 8: Pulido, Accesibilidad y Build Final

**Acciones:**

1. Revisar todos los `<Image>` — ¿tienen `alt` descriptivo no vacío?
2. Revisar el formulario — ¿todos los campos tienen `<Label>` asociado?
3. Revisar contraste en secciones con fondo de imagen o color oscuro
4. Verificar responsive en 375px, 768px, 1280px para cada sección
5. Verificar smooth scroll en todos los links de navegación
6. Crear `app/not-found.tsx` con diseño coherente y link de regreso al inicio
7. Ejecutar `npx tsc --noEmit` — corregir todos los errores TypeScript
8. Ejecutar `npm run build` — debe compilar sin errores ni warnings críticos
9. Eliminar todos los `console.log` del código
10. Verificar en Lighthouse: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 90

**Entregable verificable:** `npm run build` exitoso. Lighthouse reporta los scores mínimos. Sin errores TypeScript.

---

## CHECKLIST FINAL DE PRODUCCIÓN

Antes de declarar la landing completa, verifica cada punto:

```
Estructura y Configuración
  ☐ lib/constants/lab.ts tiene datos reales (no placeholders)
  ☐ .env.local configurado, .env.example sin valores reales
  ☐ prisma/schema.prisma y DB sincronizados (npx prisma db push)
  ☐ next.config.mjs con dominios de imágenes externas si aplica

Componentes
  ☐ navigation.tsx: scroll behavior + mobile menu + CTA funcional
  ☐ hero-section.tsx: h1 único, imagen con priority, dos CTAs
  ☐ services-section.tsx: id="servicios", grid responsive, hover effects
  ☐ process-section.tsx: pasos conectados visualmente, responsive
  ☐ why-us-section.tsx: id="nosotros", fondo diferenciado
  ☐ metrics-section.tsx: 4 métricas visibles
  ☐ testimonials-section.tsx: 3 testimonios con lazy loading
  ☐ contact-section.tsx: id="contacto", formulario completo con lazy loading
  ☐ footer-section.tsx: datos del lab, copyright dinámico

Formulario
  ☐ Validación Zod funciona client-side (errores inline)
  ☐ Server Action valida Zod server-side antes de insertar en DB
  ☐ Submit exitoso → registro en contact_requests + toast de éxito + reset
  ☐ Submit fallido → toast de error + formulario no se resetea
  ☐ Campos requeridos no pueden enviarse vacíos
  ☐ Email inválido es rechazado

Accesibilidad
  ☐ h1 único en la página (Hero)
  ☐ h2 en cada sección principal
  ☐ Todos los Image con alt descriptivo
  ☐ Labels asociados a todos los inputs del formulario
  ☐ Contraste AA (4.5:1) en texto sobre fondos de imagen
  ☐ Focus visible en todos los elementos interactivos

Performance
  ☐ priority solo en imagen del hero
  ☐ Lazy loading en testimonios y formulario
  ☐ Dimensiones explícitas en todas las imágenes (no layout shift)
  ☐ Fuentes con display: swap
  ☐ scroll-behavior: smooth en globals.css

Build
  ☐ npx tsc --noEmit sin errores
  ☐ npm run build exitoso
  ☐ Sin any en TypeScript
  ☐ Sin console.log en código
  ☐ Lighthouse: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 90
```

---

## NOTAS FINALES PARA EL AGENTE

1. **Respeta lo existente.** El sistema de diseño visual del proyecto base es tu punto de partida. No reemplaces variables CSS, no modifiques componentes en `components/ui/`, no cambies la configuración de Tailwind sin justificación.

2. **Centraliza los datos del cliente.** Cada dato institucional del laboratorio (nombre, teléfono, servicios) debe vivir en `lib/constants/lab.ts`. Si está en el JSX hardcodeado, está mal.

3. **Implementa cada tarea completamente antes de avanzar.** No dejes componentes a medias para "terminar después".

4. **Ante una decisión técnica no especificada**, elige la opción más simple que no genere deuda técnica. Si la opción más simple y la más correcta difieren, documenta la diferencia con un comentario `// NOTA:` en el código.

5. **Esta es una landing pública.** No hay RBAC, no hay sesiones, no hay rutas protegidas. La única pieza crítica de seguridad es la validación Zod server-side en el formulario. Hazla correctamente.
