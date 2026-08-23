import { obtenerLibroPorId, obtenerLibros } from '../services/librosService.js';

export async function listarLibros(_req, res) {
  const libros = await obtenerLibros();
  res.json(libros);
}

export async function obtenerLibro(req, res) {
  const id = Number(req.params.id);
  const libro = await obtenerLibroPorId(id);

  if (!libro) {
    return res.status(404).json({
      mensaje: 'Libro no encontrado',
    });
  }

  return res.json(libro);
}
