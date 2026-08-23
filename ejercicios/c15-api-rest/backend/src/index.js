import express from 'express';
import cors from 'cors';
import autoresRoutes from './routes/autoresRoutes.js';
import librosRoutes from './routes/librosRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/libros', librosRoutes);
app.use('/api/autores', autoresRoutes);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
