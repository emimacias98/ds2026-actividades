import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El titulo es obligatorio'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  imagen: z.string().trim().min(1, 'La imagen es obligatoria').url('Debe ser una URL valida'),
  descripcion: z.string().trim().min(1, 'La descripcion es obligatoria'),
  disponible: z.boolean(),
  autorId: z.coerce.number().int().positive('El autor es obligatorio'),
  categoriasIds: z.string().trim().min(1, 'Ingresa al menos una categoria'),
});

export type LibroValidado = z.infer<typeof libroSchema>;