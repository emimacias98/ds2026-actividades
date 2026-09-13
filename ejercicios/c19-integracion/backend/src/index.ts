import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import autoresRoutes from './routes/autoresRoutes.js';
import librosRoutes from './routes/librosRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;
const frontendUrls = (process.env.FRONTEND_URL ?? 'http://localhost:5173')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

app.use(cors({ origin: frontendUrls }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/autores', autoresRoutes);

app.use((_req, res) => {
  return res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});