// Réponses simulées de GET /api/events/:eventId/dashboard (une par rôle).
export const mockAdminDashboard = {
  event: { id: '1', name: 'Training Camp XIII', description: 'Vue d’ensemble des candidatures' },
  candidateStats: {
    total: 150, assigned: 120, fullyEvaluated: 114, remaining: 36,
    accepted: 60, rejected: 54, pending: 36, progress: 76,
  },
  evaluationStats: {
    rh: { done: 110, required: 150 },
    technical: { done: 95, required: 150 },
    remaining: 95,
  },
  quota: { total: 80, remaining: 20 },
  selectorProgress: [
    { id: 's1', name: 'Sara Benali', type: 'RH', done: 18, assigned: 20 },
    { id: 's2', name: 'Ahmed Khelifi', type: 'TECHNICAL', done: 12, assigned: 20 },
    { id: 's3', name: 'Lina Meziane', type: 'RH', done: 20, assigned: 20 },
    { id: 's4', name: 'Yacine Haddad', type: 'TECHNICAL', done: 15, assigned: 20 },
    { id: 's5', name: 'Nour Amrani', type: 'TECHNICAL', done: 9, assigned: 20 },
    { id: 's6', name: 'Rania Cherif', type: 'TECHNICAL', done: 17, assigned: 20 },
  ],
  pendingCandidates: [
    { id: 'c1', fullName: 'Toudert Emilia', evaluationsDone: 3, evaluationsRequired: 4 },
    { id: 'c2', fullName: 'Bouzid Karim', evaluationsDone: 2, evaluationsRequired: 4 },
    { id: 'c3', fullName: 'Mansouri Ines', evaluationsDone: 1, evaluationsRequired: 4 },
    { id: 'c4', fullName: 'Belkacem Adam', evaluationsDone: 0, evaluationsRequired: 4 },
  ],
  upcomingSteps: [
    { id: 'st1', label: 'Clôture des dossiers', dateLabel: '20 Janvier 2026', status: 'closing_soon', statusLabel: 'Dans 5 jours' },
    { id: 'st2', label: 'Export vers Google Sheets', dateLabel: '25-28 Janvier 2026', status: 'planned', statusLabel: 'Planifié' },
    { id: 'st3', label: 'Résultats finaux', dateLabel: '05 Février 2026', status: 'upcoming', statusLabel: 'À venir' },
  ],
};

export const mockSelectorDashboard = {
  event: { id: '1', name: 'Training Camp XIII', description: 'Tes candidatures à évaluer' },
  selector: { id: 's1', name: 'Sara Benali', type: 'RH' },
  stats: { assigned: 20, evaluated: 14, remaining: 6, accepted: 8, rejected: 4, pending: 2 },
  recentEvaluations: [
    { id: 'e1', candidateName: 'Toudert Emilia', decision: 'ACCEPTED', evaluatedAt: '2026-01-14T10:30:00Z' },
    { id: 'e2', candidateName: 'Bouzid Karim', decision: 'PENDING', evaluatedAt: '2026-01-14T09:10:00Z' },
    { id: 'e3', candidateName: 'Mansouri Ines', decision: 'REJECTED', evaluatedAt: '2026-01-13T16:45:00Z' },
    { id: 'e4', candidateName: 'Belkacem Adam', decision: 'ACCEPTED', evaluatedAt: '2026-01-13T11:00:00Z' },
  ],
};
