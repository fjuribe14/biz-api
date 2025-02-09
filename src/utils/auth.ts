import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret"; // Cambia esto por una clave secreta segura

// Generar un token JWT
function generateToken(user: User) {
  return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET_KEY, {
    expiresIn: "24h", // El token expira en 1 hora
  });
}

// Verificar un token JWT
function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET_KEY);
}

// Encriptar una contraseña
async function hashPassword(password: string) {
  return bcrypt.hash(password, 10); // 10 es el número de rondas de encriptación
}

// Comparar una contraseña con su versión encriptada
async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export { generateToken, verifyToken, hashPassword, comparePassword };
