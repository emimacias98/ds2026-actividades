import cors from 'cors';
import express from 'express';
import autoresRoutes from './routes/autoresRoutes.js';
import librosRoutes from './routes/librosRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/libros', librosRoutes);
app.use('/api/autores', autoresRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
