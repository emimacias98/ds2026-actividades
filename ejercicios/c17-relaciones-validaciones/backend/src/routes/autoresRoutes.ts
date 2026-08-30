import { Router } from 'express';
import {
  agregarAutor,
  borrarAutor,
  editarAutor,
  listarAutores,
  obtenerAutor,
} from '../controllers/autoresController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate, validateParams } from '../middlewares/validate.js';
import { autorCreateSchema, autorUpdateSchema } from '../validations/autorSchemas.js';
import { idParamSchema } from '../validations/paramsSchemas.js';

const router = Router();

router.get('/', asyncHandler(listarAutores));
router.get('/:id', validateParams(idParamSchema), asyncHandler(obtenerAutor));
router.post('/', validate(autorCreateSchema), asyncHandler(agregarAutor));
router.put('/:id', validateParams(idParamSchema), validate(autorUpdateSchema), asyncHandler(editarAutor));
router.delete('/:id', validateParams(idParamSchema), asyncHandler(borrarAutor));

export default router;
