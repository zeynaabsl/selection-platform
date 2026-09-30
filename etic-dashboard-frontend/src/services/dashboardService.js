import { mockAdminDashboard, mockSelectorDashboard } from '../mocks/mockDashboardData.js';

// Passe à false quand le backend est prêt : c'est le seul changement nécessaire.
const USE_MOCK = true;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboard(eventId, role) {
  if (USE_MOCK) {
    await wait(300);
    return role === 'ADMIN' ? mockAdminDashboard : mockSelectorDashboard;
  }
  // Le backend renvoie la vue adaptée à l'utilisateur authentifié (admin ou sélecteur).
  const res = await fetch(`/api/events/${eventId}/dashboard`, { credentials: 'include' });
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}
