import { Rol } from '@prisma/client';
import { Router } from 'express';
import {
  agregarLibro,
  borrarLibro,
  editarLibro,
  listarLibros,
  obtenerLibro,
} from '../controllers/librosController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate, validateParams } from '../middlewares/validate.js';
import { libroCreateSchema, libroUpdateSchema } from '../validations/libroSchemas.js';
import { idParamSchema } from '../validations/paramsSchemas.js';

const router = Router();
const soloAdmin = [authenticate, authorize(Rol.ADMIN)];

router.get('/', asyncHandler(listarLibros));
router.get('/:id', validateParams(idParamSchema), asyncHandler(obtenerLibro));
router.post('/', ...soloAdmin, validate(libroCreateSchema), asyncHandler(agregarLibro));
router.put('/:id', ...soloAdmin, validateParams(idParamSchema), validate(libroUpdateSchema), asyncHandler(editarLibro));
router.delete('/:id', ...soloAdmin, validateParams(idParamSchema), asyncHandler(borrarLibro));

export default router;