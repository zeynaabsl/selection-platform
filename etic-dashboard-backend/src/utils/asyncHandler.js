// Évite les try/catch répétés dans chaque controller : toute erreur
// (synchrone ou dans une Promise) est transmise au middleware d'erreurs.
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
