import AppError from '../utils/AppError.js';

// Autorise uniquement les rôles listés. À utiliser après authenticate().
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("Accès refusé : rôle insuffisant.", 403));
    }
    next();
  };
}
