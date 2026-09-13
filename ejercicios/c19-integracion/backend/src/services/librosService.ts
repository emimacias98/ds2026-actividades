import type { Prisma } from '@prisma/client';
import prisma from './prismaClient.js';
import type { LibroConAutor, LibroDetalle } from '../types/libro.js';

export function obtenerLibros(): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    orderBy: { id: 'asc' },
    include: { autor: true },
  });
}

export function obtenerLibroPorId(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true },
  });
}

type LibroInput = {
  titulo: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible?: boolean;
  autorId: number;
  categoriasIds: number[];
};

export function crearLibro(datos: LibroInput) {
  return prisma.libro.create({
    data: {
      titulo: datos.titulo,
      precio: datos.precio,
      imagen: datos.imagen,
      descripcion: datos.descripcion,
      disponible: datos.disponible ?? true,
      autor: {
        connect: { id: datos.autorId },
      },
      categorias: {
        connect: datos.categoriasIds.map((id) => ({ id })),
      },
    },
    include: { autor: true, categorias: true },
  });
}

export function actualizarLibro(id: number, datos: Partial<LibroInput>) {
  const data: Prisma.LibroUpdateInput = {
    titulo: datos.titulo,
    precio: datos.precio,
    imagen: datos.imagen,
    descripcion: datos.descripcion,
    disponible: datos.disponible,
    autor: datos.autorId ? { connect: { id: datos.autorId } } : undefined,
    categorias: datos.categoriasIds
      ? { set: datos.categoriasIds.map((categoriaId) => ({ id: categoriaId })) }
      : undefined,
  };

  return prisma.libro.update({
    where: { id },
    data,
    include: { autor: true, categorias: true },
  });
}

export function eliminarLibro(id: number) {
  return prisma.libro.delete({
    where: { id },
  });
}
