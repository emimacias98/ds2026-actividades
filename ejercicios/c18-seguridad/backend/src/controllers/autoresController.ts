import type { Request, Response } from 'express';
import {
  actualizarAutor,
  crearAutor,
  eliminarAutor,
  obtenerAutorPorId,
  obtenerAutores,
} from '../services/autoresService.js';

export async function listarAutores(_req: Request, res: Response) {
  const autores = await obtenerAutores();
  return res.json(autores);
}

export async function obtenerAutor(req: Request, res: Response) {
  const autor = await obtenerAutorPorId(Number(req.params.id));

  if (!autor) {
    return res.status(404).json({ mensaje: 'Autor no encontrado' });
  }

  return res.json(autor);
}

export async function agregarAutor(req: Request, res: Response) {
  const nuevoAutor = await crearAutor(req.body);
  return res.status(201).json(nuevoAutor);
}

export async function editarAutor(req: Request, res: Response) {
  const autorActualizado = await actualizarAutor(Number(req.params.id), req.body);
  return res.json(autorActualizado);
}

export async function borrarAutor(req: Request, res: Response) {
  await eliminarAutor(Number(req.params.id));
  return res.status(204).send();
}
