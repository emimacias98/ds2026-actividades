import { z } from 'zod';

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es obligatorio').max(120),
  nacionalidad: z.string().trim().min(1, 'La nacionalidad es obligatoria').max(80),
  nacimiento: z.coerce.number().int().min(1, 'El anio de nacimiento es obligatorio'),
});

export const autorUpdateSchema = autorCreateSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'Debe enviar al menos un campo para actualizar',
);
