import pool from '../config/db.js';

// Progression de chaque sélecteur d'un événement (nb d'évaluations faites / assignées).
export async function getSelectorsProgress(eventId) {
  const { rows } = await pool.query(
    `
    SELECT
      es.id AS event_selector_id,
      u.id AS user_id,
      u.full_name AS name,
      es.selector_type AS type,
      COUNT(a.id)::int AS assigned,
      COUNT(e.id) FILTER (WHERE e.decision <> 'PENDING')::int AS evaluated
    FROM event_selectors es
    JOIN users u ON u.id = es.user_id
    LEFT JOIN assignments a ON a.event_selector_id = es.id
    LEFT JOIN evaluations e ON e.assignment_id = a.id
    WHERE es.event_id = $1
    GROUP BY es.id, u.id, u.full_name, es.selector_type
    ORDER BY u.full_name ASC
    `,
    [eventId]
  );
  return rows;
}

// Retrouve le event_selector_id (avec son type) d'un utilisateur pour un événement donné.
// C'est ce qui garantit qu'un sélecteur ne peut agir que sur ses propres affectations.
export async function findEventSelector(eventId, userId) {
  const { rows } = await pool.query(
    `SELECT id, selector_type AS type FROM event_selectors WHERE event_id = $1 AND user_id = $2`,
    [eventId, userId]
  );
  return rows[0] || null;
}

// Statistiques personnelles d'un sélecteur (uniquement ses propres affectations).
export async function getSelectorOwnStats(eventSelectorId) {
  const { rows } = await pool.query(
    `
    SELECT
      COUNT(a.id)::int AS assigned,
      COUNT(e.id) FILTER (WHERE e.decision <> 'PENDING')::int AS evaluated,
      COUNT(e.id) FILTER (WHERE e.decision = 'ACCEPTED')::int AS accepted,
      COUNT(e.id) FILTER (WHERE e.decision = 'REJECTED')::int AS rejected,
      (COUNT(a.id) - COUNT(e.id) FILTER (WHERE e.decision <> 'PENDING'))::int AS pending
    FROM assignments a
    LEFT JOIN evaluations e ON e.assignment_id = a.id
    WHERE a.event_selector_id = $1
    `,
    [eventSelectorId]
  );
  return rows[0];
}

// Dernières candidatures évaluées par CE sélecteur uniquement.
export async function getSelectorRecentEvaluations(eventSelectorId, limit = 10) {
  const { rows } = await pool.query(
    `
    SELECT c.full_name AS candidate_name, e.decision, e.evaluated_at
    FROM evaluations e
    JOIN assignments a ON a.id = e.assignment_id
    JOIN candidates c ON c.id = a.candidate_id
    WHERE a.event_selector_id = $1 AND e.decision <> 'PENDING'
    ORDER BY e.evaluated_at DESC
    LIMIT $2
    `,
    [eventSelectorId, limit]
  );
  return rows;
}
