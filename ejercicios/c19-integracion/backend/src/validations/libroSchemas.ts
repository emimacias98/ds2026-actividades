import { z } from 'zod';

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, 'El titulo es obligatorio').max(200),
  precio: z.coerce.number().int().positive('El precio debe ser mayor a 0'),
  imagen: z.string().trim().min(1, 'La imagen es obligatoria'),
  descripcion: z.string().trim().min(1, 'La descripcion es obligatoria'),
  disponible: z.boolean().optional().default(true),
  autorId: z.coerce.number().int().positive('El autor es obligatorio'),
  categoriasIds: z.array(z.coerce.number().int().positive()).min(1, 'Debe elegir al menos una categoria'),
});

export const libroUpdateSchema = libroCreateSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'Debe enviar al menos un campo para actualizar',
);
