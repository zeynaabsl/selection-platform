# ETIC — API Dashboard (backend)

Node.js + Express + PostgreSQL. Fournit uniquement les endpoints du Dashboard
Admin et Sélecteur ; le frontend est développé séparément et consomme ces routes.

## 1. Installer et configurer

```bash
npm install
cp .env.example .env      # renseigne DATABASE_URL et JWT_SECRET
npm run migrate           # crée les tables
npm run seed               # (optionnel) insère un événement + données de démo
npm run dev                # démarre sur http://localhost:4000
```

## 2. Authentification (à adapter à ton système réel)

L'auth est simulée par un JWT signé avec `JWT_SECRET`, contenant `{ id, role }`.
Génère un token de test :

```bash
node scripts/generateToken.js 1 ADMIN
node scripts/generateToken.js 2 SELECTOR
```

Envoie-le ensuite dans le header `Authorization: Bearer <token>`.
Quand le vrai système de login existera, il suffit de remplacer la génération
du JWT (le contrat `{ id, role }` attendu par `authenticate` ne change pas).

## 3. Endpoints disponibles

| Méthode | Route | Rôle requis | Description |
|---|---|---|---|
| GET | `/health` | — | Vérifie que l'API répond |
| GET | `/api/events/:eventId/dashboard` | ADMIN | Statistiques globales de l'événement |
| GET | `/api/events/:eventId/my-dashboard` | SELECTOR | Statistiques du sélecteur connecté uniquement |

`my-dashboard` ignore tout `selectorId` qui viendrait de l'URL ou du body :
l'identité est prise uniquement dans `req.user.id`, extrait du JWT vérifié
côté serveur (`src/middlewares/auth.js`). Un sélecteur ne peut donc jamais lire
les données d'un autre sélecteur en modifiant un paramètre.

## 4. Tester

```bash
TOKEN_ADMIN=$(node scripts/generateToken.js 1 ADMIN)
curl -H "Authorization: Bearer $TOKEN_ADMIN" http://localhost:4000/api/events/1/dashboard

TOKEN_SELECTOR=$(node scripts/generateToken.js 2 SELECTOR)
curl -H "Authorization: Bearer $TOKEN_SELECTOR" http://localhost:4000/api/events/1/my-dashboard
```

(Les IDs 1/2 correspondent aux utilisateurs créés par `npm run seed`.)

## 5. Structure de la base de données

- `users` — id, nom, email, rôle (`ADMIN` / `SELECTOR`)
- `events` — événement, quota de places, nb d'évaluations RH/Technique requises par candidature
- `event_selectors` — rattache un `user` à un `event` en tant que sélecteur RH ou Technique
- `candidates` — candidatures, rattachées à un `event`
- `assignments` — affectation d'une `candidate` à un `event_selector` (relation N--N)
- `evaluations` — décision (`ACCEPTED` / `REJECTED` / `PENDING`), commentaire, date, liée à un `assignment`
- `logs` — table libre pour tracer les actions (non utilisée par le dashboard pour l'instant)

Voir `db/migrations/001_init.sql` pour le détail et les relations en commentaire.

## 6. Comment le frontend consomme l'API

```js
const res = await fetch(`/api/events/${eventId}/dashboard`, {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
```

La forme de la réponse de `/dashboard` correspond à celle donnée dans la
spec (`event`, `candidates`, `results`, `evaluations`, `quota`, + `selectors`
et `pendingCandidates`). Il suffit, côté frontend, de brancher cet appel à la
place du mock existant (`USE_MOCK = false` dans `dashboardService.js` du
projet frontend) — la forme des données a été alignée pour correspondre.

## 7. Fichiers créés

```
src/
  app.js, server.js
  config/        db.js, env.js
  db/            eventRepository.js, candidateRepository.js, selectorRepository.js
  middlewares/   auth.js, permissions.js, errorHandler.js
  services/      dashboardService.js
  controllers/   dashboardController.js
  routes/        index.js, eventRoutes.js, dashboardRoutes.js
  utils/         AppError.js, asyncHandler.js
db/
  migrations/001_init.sql
  migrate.js, seed.js
scripts/generateToken.js
```
