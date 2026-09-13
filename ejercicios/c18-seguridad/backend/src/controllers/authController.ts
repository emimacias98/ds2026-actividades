import type { Request, Response } from 'express';
import { loginUsuario, registrarUsuario } from '../services/authService.js';

export async function registro(req: Request, res: Response) {
  const usuario = await registrarUsuario(req.body);
  return res.status(201).json(usuario);
}

export async function login(req: Request, res: Response) {
  const resultado = await loginUsuario(req.body);
  return res.json(resultado);
}

export function yo(req: Request, res: Response) {
  return res.json(req.usuario);
}