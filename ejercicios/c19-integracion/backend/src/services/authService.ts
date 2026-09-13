import type { Usuario } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prismaClient.js';
import { HttpError } from '../utils/HttpError.js';

type RegistroInput = {
  email: string;
  password: string;
  nombre: string;
};

type LoginInput = {
  email: string;
  password: string;
};

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';

function sanitizarUsuario(usuario: Usuario) {
  return {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    rol: usuario.rol,
  };
}

export async function registrarUsuario(datos: RegistroInput) {
  const passwordHash = await bcrypt.hash(datos.password, 10);

  const usuario = await prisma.usuario.create({
    data: {
      email: datos.email,
      nombre: datos.nombre,
      passwordHash,
    },
  });

  return sanitizarUsuario(usuario);
}

export async function loginUsuario(datos: LoginInput) {
  const usuario = await prisma.usuario.findUnique({ where: { email: datos.email } });

  if (!usuario) {
    throw new HttpError(401, 'Credenciales invalidas');
  }

  const passwordOk = await bcrypt.compare(datos.password, usuario.passwordHash);

  if (!passwordOk) {
    throw new HttpError(401, 'Credenciales invalidas');
  }

  const usuarioSeguro = sanitizarUsuario(usuario);
  const token = jwt.sign(usuarioSeguro, JWT_SECRET, { expiresIn: '1h' });

  return { token, usuario: usuarioSeguro };
}