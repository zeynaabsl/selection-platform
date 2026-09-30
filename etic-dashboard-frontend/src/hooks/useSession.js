import { mockSession } from '../mocks/mockSession.js';

// À remplacer par la lecture du vrai utilisateur connecté (contexte, store, etc.).
export default function useSession() {
  return mockSession;
}
