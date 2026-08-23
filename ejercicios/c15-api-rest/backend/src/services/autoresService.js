let autores = [
  {
    id: 1,
    nombre: 'Jorge Luis Borges',
    nacionalidad: 'Argentina',
    nacimiento: 1899,
  },
  {
    id: 2,
    nombre: 'Julio Cortazar',
    nacionalidad: 'Argentina',
    nacimiento: 1914,
  },
  {
    id: 3,
    nombre: 'Gabriel Garcia Marquez',
    nacionalidad: 'Colombiana',
    nacimiento: 1927,
  },
];

let siguienteId = 4;

export function obtenerAutores() {
  return autores;
}

export function obtenerAutorPorId(id) {
  return autores.find((autor) => autor.id === id);
}

export function crearAutor(datos) {
  const nuevoAutor = {
    id: siguienteId,
    nombre: datos.nombre,
    nacionalidad: datos.nacionalidad,
    nacimiento: Number(datos.nacimiento),
  };

  siguienteId += 1;
  autores.push(nuevoAutor);

  return nuevoAutor;
}

export function actualizarAutor(id, datos) {
  const autor = obtenerAutorPorId(id);

  if (!autor) {
    return null;
  }

  autor.nombre = datos.nombre ?? autor.nombre;
  autor.nacionalidad = datos.nacionalidad ?? autor.nacionalidad;
  autor.nacimiento = datos.nacimiento ? Number(datos.nacimiento) : autor.nacimiento;

  return autor;
}

export function eliminarAutor(id) {
  const existe = autores.some((autor) => autor.id === id);

  if (!existe) {
    return false;
  }

  autores = autores.filter((autor) => autor.id !== id);
  return true;
}
