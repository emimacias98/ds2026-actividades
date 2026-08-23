import { Router } from 'express';
import {
  agregarAutor,
  borrarAutor,
  editarAutor,
  listarAutores,
  obtenerAutor,
} from '../controllers/autoresController.js';

const router = Router();

router.get('/', listarAutores);
router.get('/:id', obtenerAutor);
router.post('/', agregarAutor);
router.put('/:id', editarAutor);
router.delete('/:id', borrarAutor);

export default router;
