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
