export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route introuvable.' });
}

// Middleware d'erreurs centralisé : toute erreur passée à next(err) atterrit ici.
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode || 500;
  if (statusCode === 500) console.error(err);
  res.status(statusCode).json({ error: err.message || 'Erreur interne du serveur.' });
}
