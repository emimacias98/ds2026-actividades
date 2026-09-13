import type { Prisma } from '@prisma/client';

export type AutorConLibros = Prisma.AutorGetPayload<{
  include: {
    libros: true;
  };
}>;
