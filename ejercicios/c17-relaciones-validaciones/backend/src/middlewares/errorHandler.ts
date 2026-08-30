import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Datos invalidos',
      detalles: err.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensaje: issue.message,
      })),
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Ya existe un registro con ese valor' });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'No encontrado' });
    }

    if (err.code === 'P2003') {
      return res.status(409).json({ error: 'Hay registros relacionados' });
    }
  }

  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
}
