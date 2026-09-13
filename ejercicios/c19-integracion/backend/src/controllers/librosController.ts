import type { Request, Response } from 'express';
import {
  actualizarLibro,
  crearLibro,
  eliminarLibro,
  obtenerLibroPorId,
  obtenerLibros,
} from '../services/librosService.js';

export async function listarLibros(_req: Request, res: Response) {
  const libros = await obtenerLibros();
  return res.json(libros);
}

export async function obtenerLibro(req: Request, res: Response) {
  const libro = await obtenerLibroPorId(Number(req.params.id));

  if (!libro) {
    return res.status(404).json({ mensaje: 'Libro no encontrado' });
  }

  return res.json(libro);
}

export async function agregarLibro(req: Request, res: Response) {
  const nuevoLibro = await crearLibro(req.body);
  return res.status(201).json(nuevoLibro);
}

export async function editarLibro(req: Request, res: Response) {
  const libroActualizado = await actualizarLibro(Number(req.params.id), req.body);
  return res.json(libroActualizado);
}

export async function borrarLibro(req: Request, res: Response) {
  await eliminarLibro(Number(req.params.id));
  return res.status(204).send();
}
