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

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});