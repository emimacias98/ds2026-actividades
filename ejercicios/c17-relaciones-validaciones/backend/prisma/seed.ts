import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const autores = [
  {
    nombre: 'Jorge Luis Borges',
    nacionalidad: 'Argentina',
    nacimiento: 1899,
  },
  {
    nombre: 'Julio Cortazar',
    nacionalidad: 'Argentina',
    nacimiento: 1914,
  },
  {
    nombre: 'Gabriel Garcia Marquez',
    nacionalidad: 'Colombiana',
    nacimiento: 1927,
  },
];

const categorias = [
  { nombre: 'Cuentos' },
  { nombre: 'Novela' },
  { nombre: 'Literatura latinoamericana' },
];

const libros = [
  {
    titulo: 'El Aleph',
    autor: 'Jorge Luis Borges',
    precio: 15000,
    imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Libro destacado de literatura argentina.',
    disponible: true,
    categorias: ['Cuentos', 'Literatura latinoamericana'],
  },
  {
    titulo: 'Rayuela',
    autor: 'Julio Cortazar',
    precio: 18000,
    imagen: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Novela clasica de Julio Cortazar.',
    disponible: true,
    categorias: ['Novela', 'Literatura latinoamericana'],
  },
  {
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    precio: 14000,
    imagen: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Cuentos breves con mundos imaginarios y laberintos.',
    disponible: true,
    categorias: ['Cuentos'],
  },
];

async function main() {
  await prisma.libro.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.autor.deleteMany();

  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, categorias: nombresCategorias, ...datosLibro } of libros) {
    await prisma.libro.create({
      data: {
        ...datosLibro,
        autor: {
          connect: { nombre: autor },
        },
        categorias: {
          connect: nombresCategorias.map((nombre) => ({ nombre })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
