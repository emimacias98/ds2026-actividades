import {
  actualizarAutor,
  crearAutor,
  eliminarAutor,
  obtenerAutorPorId,
  obtenerAutores,
} from '../services/autoresService.js';

export async function listarAutores(_req, res) {
  const autores = await obtenerAutores();
  res.json(autores);
}

export async function obtenerAutor(req, res) {
  const id = Number(req.params.id);
  const autor = await obtenerAutorPorId(id);

  if (!autor) {
    return res.status(404).json({
      mensaje: 'Autor no encontrado',
    });
  }

  return res.json(autor);
}

export async function agregarAutor(req, res) {
  const nuevoAutor = await crearAutor(req.body);
  res.status(201).json(nuevoAutor);
}

export async function editarAutor(req, res) {
  const id = Number(req.params.id);

  try {
    const autorActualizado = await actualizarAutor(id, req.body);
    return res.json(autorActualizado);
  } catch (_error) {
    return res.status(404).json({
      mensaje: 'Autor no encontrado',
    });
  }
}

export async function borrarAutor(req, res) {
  const id = Number(req.params.id);

  try {
    await eliminarAutor(id);
    return res.status(204).send();
  } catch (_error) {
    return res.status(404).json({
      mensaje: 'Autor no encontrado',
    });
  }
}
