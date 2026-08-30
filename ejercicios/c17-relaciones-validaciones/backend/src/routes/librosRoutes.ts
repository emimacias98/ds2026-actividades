import { Router } from 'express';
import {
  agregarLibro,
  borrarLibro,
  editarLibro,
  listarLibros,
  obtenerLibro,
} from '../controllers/librosController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate, validateParams } from '../middlewares/validate.js';
import { libroCreateSchema, libroUpdateSchema } from '../validations/libroSchemas.js';
import { idParamSchema } from '../validations/paramsSchemas.js';

const router = Router();

router.get('/', asyncHandler(listarLibros));
router.get('/:id', validateParams(idParamSchema), asyncHandler(obtenerLibro));
router.post('/', validate(libroCreateSchema), asyncHandler(agregarLibro));
router.put('/:id', validateParams(idParamSchema), validate(libroUpdateSchema), asyncHandler(editarLibro));
router.delete('/:id', validateParams(idParamSchema), asyncHandler(borrarLibro));

export default router;
