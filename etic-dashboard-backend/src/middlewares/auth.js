import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import AppError from '../utils/AppError.js';

// Authentification par JWT (simulée : voir README pour générer un token de test).
// Le payload attendu est { id, role: 'ADMIN' | 'SELECTOR', fullName, email }.
export function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return next(new AppError('Authentification requise.', 401));

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(new AppError('Token invalide ou expiré.', 401));
  }
}
