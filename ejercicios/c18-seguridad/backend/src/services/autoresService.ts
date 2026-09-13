import type { Prisma } from '@prisma/client';
import prisma from './prismaClient.js';
import type { AutorConLibros } from '../types/autor.js';

export function obtenerAutores(): Promise<AutorConLibros[]> {
  return prisma.autor.findMany({
    orderBy: { id: 'asc' },
    include: { libros: true },
  });
}

export function obtenerAutorPorId(id: number): Promise<AutorConLibros | null> {
  return prisma.autor.findUnique({
    where: { id },
    include: { libros: true },
  });
}

export function crearAutor(datos: Prisma.AutorCreateInput) {
  return prisma.autor.create({ data: datos });
}

export function actualizarAutor(id: number, datos: Prisma.AutorUpdateInput) {
  return prisma.autor.update({
    where: { id },
    data: datos,
  });
}

export function eliminarAutor(id: number) {
  return prisma.autor.delete({
    where: { id },
  });
}
