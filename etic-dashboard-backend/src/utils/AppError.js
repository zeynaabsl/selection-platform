// Erreur applicative avec un status HTTP explicite, pour distinguer
// les erreurs prévisibles (404, 403...) des bugs inattendus.
export default class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
