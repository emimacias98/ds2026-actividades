import prisma from './prismaClient.js';

export function obtenerAutores() {
  return prisma.autor.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export function obtenerAutorPorId(id) {
  return prisma.autor.findUnique({
    where: {
      id,
    },
  });
}

export function crearAutor(datos) {
  return prisma.autor.create({
    data: {
      nombre: datos.nombre,
      nacionalidad: datos.nacionalidad,
      nacimiento: Number(datos.nacimiento),
    },
  });
}

export function actualizarAutor(id, datos) {
  return prisma.autor.update({
    where: {
      id,
    },
    data: {
      nombre: datos.nombre,
      nacionalidad: datos.nacionalidad,
      nacimiento: Number(datos.nacimiento),
    },
  });
}

export function eliminarAutor(id) {
  return prisma.autor.delete({
    where: {
      id,
    },
  });
}
