// Génère un JWT de test pour appeler l'API sans système d'auth complet.
// Usage : node scripts/generateToken.js <userId> <ADMIN|SELECTOR>
import jwt from 'jsonwebtoken';
import { env } from '../src/config/env.js';

const [, , id, role] = process.argv;
if (!id || !role) {
  console.error('Usage: node scripts/generateToken.js <userId> <ADMIN|SELECTOR>');
  process.exit(1);
}

const token = jwt.sign({ id: Number(id), role }, env.jwtSecret, { expiresIn: '7d' });
console.log(token);
