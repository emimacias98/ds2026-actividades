import { z } from 'zod';

export const registroSchema = z.object({
  email: z.string().trim().email('El email debe ser valido'),
  password: z
    .string()
    .min(8, 'La password debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La password debe tener una mayuscula')
    .regex(/[a-z]/, 'La password debe tener una minuscula')
    .regex(/[0-9]/, 'La password debe tener un numero'),
  nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
});

export const loginSchema = z.object({
  email: z.string().trim().email('El email debe ser valido'),
  password: z.string().min(1, 'La password es obligatoria'),
});