import type { Prisma } from '@prisma/client';

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: {
    autor: true;
  };
}>;

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: {
    autor: true;
    categorias: true;
  };
}>;
