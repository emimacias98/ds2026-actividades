import type { Rol } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';

type TokenPayload = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  const token = authHeader.slice('Bearer '.length);

  try {
    req.usuario = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return next();
  } catch {
    return res.status(401).json({ error: 'No autenticado' });
  }
}

export function authorize(...roles: Rol[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    return next();
  };
}