import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const libros = [
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

app.get('/', (_req, res) => {
  res.json({
    mensaje: 'API de Libreria funcionando',
  });
});

app.get('/health', async (_req, res) => {
  const db = await pool.query('SELECT NOW()');

  res.json({
    api: 'ok',
    db: db.rows[0],
  });
});

app.get('/libros', (_req, res) => {
  res.json(libros);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});