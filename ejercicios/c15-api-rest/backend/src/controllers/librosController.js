import { obtenerLibroPorId, obtenerLibros } from '../services/librosService.js';

export function listarLibros(_req, res) {
  res.json(obtenerLibros());
}

export function obtenerLibro(req, res) {
  const id = Number(req.params.id);
  const libro = obtenerLibroPorId(id);

  if (!libro) {
    return res.status(404).json({
      mensaje: 'Libro no encontrado',
    });
  }

  return res.json(libro);
}
