-- Schéma minimal pour le module Dashboard Admin / Sélecteur.
-- Relations :
--   events            1---N candidates          (une candidature appartient à un événement)
--   events            1---N event_selectors      (un sélecteur RH/Technique est rattaché à un événement)
--   users             1---N event_selectors      (un utilisateur peut être sélecteur sur plusieurs événements)
--   candidates        N---N event_selectors      via assignments (une candidature affectée à plusieurs sélecteurs)
--   assignments        1---N evaluations         (chaque affectation donne lieu à au plus une évaluation)

CREATE TYPE user_role AS ENUM ('ADMIN', 'SELECTOR');
CREATE TYPE selector_type AS ENUM ('RH', 'TECHNICAL');
CREATE TYPE decision_type AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');
CREATE TYPE candidate_status AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  full_name     VARCHAR(150) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          user_role NOT NULL DEFAULT 'SELECTOR',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE events (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(150) NOT NULL,
  description       TEXT,
  quota_total       INTEGER NOT NULL DEFAULT 0,
  required_rh_evals INTEGER NOT NULL DEFAULT 1,   -- nb d'évaluations RH requises par candidature
  required_tech_evals INTEGER NOT NULL DEFAULT 1, -- nb d'évaluations Technique requises par candidature
  closes_at         TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Rattache un utilisateur ADMIN/SELECTOR à un événement, avec sa spécialité si sélecteur.
CREATE TABLE event_selectors (
  id           SERIAL PRIMARY KEY,
  event_id     INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  selector_type selector_type NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (event_id, user_id)
);

CREATE TABLE candidates (
  id           SERIAL PRIMARY KEY,
  event_id     INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  full_name    VARCHAR(150) NOT NULL,
  email        VARCHAR(150),
  status       candidate_status NOT NULL DEFAULT 'PENDING', -- statut final calculé/validé
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Affectation d'une candidature à un sélecteur (candidate N---N event_selectors).
CREATE TABLE assignments (
  id                 SERIAL PRIMARY KEY,
  candidate_id       INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  event_selector_id  INTEGER NOT NULL REFERENCES event_selectors(id) ON DELETE CASCADE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (candidate_id, event_selector_id)
);

CREATE TABLE evaluations (
  id             SERIAL PRIMARY KEY,
  assignment_id  INTEGER NOT NULL UNIQUE REFERENCES assignments(id) ON DELETE CASCADE,
  decision       decision_type NOT NULL DEFAULT 'PENDING',
  comment        TEXT,
  evaluated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE logs (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action      VARCHAR(100) NOT NULL,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_candidates_event ON candidates(event_id);
CREATE INDEX idx_event_selectors_event ON event_selectors(event_id);
CREATE INDEX idx_assignments_candidate ON assignments(candidate_id);
CREATE INDEX idx_assignments_event_selector ON assignments(event_selector_id);
