import type { Libro } from '../types/libro';

const borges = {
  id: 1,
  nombre: 'Jorge Luis Borges',
  nacionalidad: 'Argentina',
  nacimiento: 1899,
};

const cortazar = {
  id: 2,
  nombre: 'Julio Cortazar',
  nacionalidad: 'Argentina',
  nacimiento: 1914,
};

export const librosIniciales: Libro[] = [
  {
    id: 1,
    titulo: 'El Aleph',
    autorId: 1,
    autor: borges,
    precio: 15000,
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Libro destacado de literatura argentina.',
    disponible: true,
  },
  {
    id: 2,
    titulo: 'Rayuela',
    autorId: 2,
    autor: cortazar,
    precio: 18000,
    imagen: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Novela clasica de Julio Cortazar.',
    disponible: true,
  },
  {
    id: 3,
    titulo: 'Ficciones',
    autorId: 1,
    autor: borges,
    precio: 14000,
    imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Cuentos breves con mundos imaginarios y laberintos.',
    disponible: true,
  },
];