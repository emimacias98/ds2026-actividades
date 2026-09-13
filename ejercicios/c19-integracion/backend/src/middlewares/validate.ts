import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';

export function validate(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return next(resultado.error);
    }

    req.body = resultado.data;
    return next();
  };
}

export function validateParams(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.params);

    if (!resultado.success) {
      return next(resultado.error);
    }

    req.params = resultado.data as Request['params'];
    return next();
  };
}
