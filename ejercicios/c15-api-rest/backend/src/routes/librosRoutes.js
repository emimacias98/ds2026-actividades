import { Router } from 'express';
import { listarLibros, obtenerLibro } from '../controllers/librosController.js';

const router = Router();

router.get('/', listarLibros);
router.get('/:id', obtenerLibro);

export default router;
