import {
  actualizarAutor,
  crearAutor,
  eliminarAutor,
  obtenerAutorPorId,
  obtenerAutores,
} from '../services/autoresService.js';

export function listarAutores(_req, res) {
  res.json(obtenerAutores());
}

export function obtenerAutor(req, res) {
  const id = Number(req.params.id);
  const autor = obtenerAutorPorId(id);

  if (!autor) {
    return res.status(404).json({
      mensaje: 'Autor no encontrado',
    });
  }

  return res.json(autor);
}

export function agregarAutor(req, res) {
  const nuevoAutor = crearAutor(req.body);
  res.status(201).json(nuevoAutor);
}

export function editarAutor(req, res) {
  const id = Number(req.params.id);
  const autorActualizado = actualizarAutor(id, req.body);

  if (!autorActualizado) {
    return res.status(404).json({
      mensaje: 'Autor no encontrado',
    });
  }

  return res.json(autorActualizado);
}

export function borrarAutor(req, res) {
  const id = Number(req.params.id);
  const eliminado = eliminarAutor(id);

  if (!eliminado) {
    return res.status(404).json({
      mensaje: 'Autor no encontrado',
    });
  }

  return res.status(204).send();
}
