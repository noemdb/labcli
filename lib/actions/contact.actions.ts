"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact.schema";

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
  } catch (error) {
    return {
      success: false,
      error: "Ocurrió un error al enviar tu solicitud. Intenta nuevamente.",
    };
  }
}
