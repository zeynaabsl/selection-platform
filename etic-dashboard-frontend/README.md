# ETIC — Dashboard (frontend)

## Lancer
```bash
npm install
npm run dev      # http://localhost:5173  ->  /events/1/dashboard
```

## Changer de rôle (mock)
Dans `src/mocks/mockSession.js`, mets `role: 'ADMIN'` ou `role: 'SELECTOR'`.

## Passer du mock à l'API
Dans `src/services/dashboardService.js`, mets `USE_MOCK = false`.
Le service appelle alors `GET /api/events/:eventId/dashboard`, qui doit renvoyer
la même forme que `src/mocks/mockDashboardData.js` (une par rôle).
