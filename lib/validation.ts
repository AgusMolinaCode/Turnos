import { z } from "zod";

// Helper para validar que la fecha no sea en el pasado
const futureDateSchema = z.coerce.date().refine((date) => date > new Date(), {
  message: "La fecha del turno no puede ser en el pasado",
});

// Campos base compartidos entre User y Client
const BaseUserSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre debe tener como máximo 50 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número de teléfono inválido"),
});

export const UserFormValidation = BaseUserSchema;

export const ClientFormValidation = BaseUserSchema.extend({
  birthDate: z.coerce.date(),
  primaryProfessional: z.string().min(2, "Selecciona al menos un profesional"),
  documentoDni: z.string().min(7, "El DNI debe tener al menos 7 caracteres"),
  documentoUrlPhoto: z.custom<File[]>().refine((files) => files.length > 0, {
    message: "Se requiere al menos una foto",
  }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debes aceptar la política de privacidad para continuar",
    }),
});


export const CreateTurnoSchema = z.object({
  primaryProfessional: z.string().min(2, "Selecciona al menos un profesional"),
  schedule: futureDateSchema,
  description: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .max(500, "La descripción debe tener como máximo 500 caracteres"),
  notes: z.string().optional(),
  cancelationReason: z.string().optional(),
});

export const ScheduleTurnoSchema = z.object({
  primaryProfessional: z.string().min(2, "Selecciona al menos un profesional"),
  schedule: futureDateSchema,
  description: z.string().optional(),
  notes: z.string().optional(),
  cancelationReason: z.string().optional(),
});

export const CancelTurnoSchema = z.object({
  primaryProfessional: z.string().min(2, "Selecciona al menos un profesional"),
  schedule: futureDateSchema,
  notes: z.string().optional(),
  description: z.string().optional(),
  cancelationReason: z
    .string()
    .min(2, "El motivo debe tener al menos 2 caracteres")
    .max(500, "El motivo debe tener como máximo 500 caracteres"),
});

export function getTurnoFormValidation(type: string) {
  switch (type) {
    case "create":
      return CreateTurnoSchema;
    case "cancel":
      return CancelTurnoSchema;
    default:
      return ScheduleTurnoSchema;
  }
}