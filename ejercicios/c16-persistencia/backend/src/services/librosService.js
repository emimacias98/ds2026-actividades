import prisma from './prismaClient.js';

export function obtenerLibros() {
  return prisma.libro.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export function obtenerLibroPorId(id) {
  return prisma.libro.findUnique({
    where: {
      id,
    },
  });
}
