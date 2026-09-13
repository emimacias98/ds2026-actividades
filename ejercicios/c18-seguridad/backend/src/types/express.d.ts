import type { Rol } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        email: string;
        nombre: string;
        rol: Rol;
      };
    }
  }
}

export {};