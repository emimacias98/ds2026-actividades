import type { Libro } from '../types/libro';

export const librosIniciales: Libro[] = [
  {
    id: 1,
    titulo: 'El Aleph',
    autor: 'Jorge Luis Borges',
    precio: 15000,
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Libro destacado de literatura argentina.',
    disponible: true,
  },
  {
    id: 2,
    titulo: 'Rayuela',
    autor: 'Julio Cortazar',
    precio: 18000,
    imagen: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Novela clasica de Julio Cortazar.',
    disponible: true,
  },
  {
    id: 3,
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    precio: 14000,
    imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Cuentos breves con mundos imaginarios y laberintos.',
    disponible: true,
  },
];