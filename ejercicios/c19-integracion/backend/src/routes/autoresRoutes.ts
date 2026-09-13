import { Rol } from '@prisma/client';
import { Router } from 'express';
import {
  agregarAutor,
  borrarAutor,
  editarAutor,
  listarAutores,
  obtenerAutor,
} from '../controllers/autoresController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate, validateParams } from '../middlewares/validate.js';
import { autorCreateSchema, autorUpdateSchema } from '../validations/autorSchemas.js';
import { idParamSchema } from '../validations/paramsSchemas.js';

const router = Router();
const soloAdmin = [authenticate, authorize(Rol.ADMIN)];

router.get('/', asyncHandler(listarAutores));
router.get('/:id', validateParams(idParamSchema), asyncHandler(obtenerAutor));
router.post('/', ...soloAdmin, validate(autorCreateSchema), asyncHandler(agregarAutor));
router.put('/:id', ...soloAdmin, validateParams(idParamSchema), validate(autorUpdateSchema), asyncHandler(editarAutor));
router.delete('/:id', ...soloAdmin, validateParams(idParamSchema), asyncHandler(borrarAutor));

export default router;