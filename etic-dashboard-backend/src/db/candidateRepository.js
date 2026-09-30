import pool from '../config/db.js';

// Statistiques globales des candidatures d'un événement.
export async function getCandidateStats(eventId, requiredRh, requiredTech) {
  const { rows } = await pool.query(
    `
    SELECT
      COUNT(DISTINCT c.id)::int AS total,
      COUNT(DISTINCT a.candidate_id)::int AS assigned,
      COUNT(DISTINCT c.id) FILTER (WHERE c.status = 'ACCEPTED')::int AS accepted,
      COUNT(DISTINCT c.id) FILTER (WHERE c.status = 'REJECTED')::int AS rejected,
      COUNT(DISTINCT c.id) FILTER (WHERE c.status = 'PENDING')::int AS pending,
      COUNT(DISTINCT c.id) FILTER (
        WHERE rh_counts.rh_done >= $2 AND tech_counts.tech_done >= $3
      )::int AS fully_evaluated
    FROM candidates c
    LEFT JOIN assignments a ON a.candidate_id = c.id
    LEFT JOIN (
      SELECT a.candidate_id, COUNT(e.id)::int AS rh_done
      FROM assignments a
      JOIN event_selectors es ON es.id = a.event_selector_id AND es.selector_type = 'RH'
      JOIN evaluations e ON e.assignment_id = a.id AND e.decision <> 'PENDING'
      GROUP BY a.candidate_id
    ) rh_counts ON rh_counts.candidate_id = c.id
    LEFT JOIN (
      SELECT a.candidate_id, COUNT(e.id)::int AS tech_done
      FROM assignments a
      JOIN event_selectors es ON es.id = a.event_selector_id AND es.selector_type = 'TECHNICAL'
      JOIN evaluations e ON e.assignment_id = a.id AND e.decision <> 'PENDING'
      GROUP BY a.candidate_id
    ) tech_counts ON tech_counts.candidate_id = c.id
    WHERE c.event_id = $1
    `,
    [eventId, requiredRh, requiredTech]
  );
  return rows[0];
}

// Total des évaluations RH / Technique réalisées pour l'événement.
export async function getEvaluationCounts(eventId) {
  const { rows } = await pool.query(
    `
    SELECT
      COUNT(*) FILTER (WHERE es.selector_type = 'RH' AND e.decision <> 'PENDING')::int AS rh_done,
      COUNT(*) FILTER (WHERE es.selector_type = 'TECHNICAL' AND e.decision <> 'PENDING')::int AS tech_done
    FROM evaluations e
    JOIN assignments a ON a.id = e.assignment_id
    JOIN event_selectors es ON es.id = a.event_selector_id
    JOIN candidates c ON c.id = a.candidate_id
    WHERE c.event_id = $1
    `,
    [eventId]
  );
  return rows[0];
}

// Candidatures dont l'évaluation n'est pas terminée (au moins une éval manquante ou en attente).
export async function getPendingCandidates(eventId, requiredRh, requiredTech, limit = 20) {
  const { rows } = await pool.query(
    `
    SELECT
      c.id, c.full_name,
      COALESCE(rh_counts.rh_done, 0)::int + COALESCE(tech_counts.tech_done, 0)::int AS evaluations_done,
      ($2::int + $3::int) AS evaluations_required
    FROM candidates c
    LEFT JOIN (
      SELECT a.candidate_id, COUNT(e.id)::int AS rh_done
      FROM assignments a
      JOIN event_selectors es ON es.id = a.event_selector_id AND es.selector_type = 'RH'
      JOIN evaluations e ON e.assignment_id = a.id AND e.decision <> 'PENDING'
      GROUP BY a.candidate_id
    ) rh_counts ON rh_counts.candidate_id = c.id
    LEFT JOIN (
      SELECT a.candidate_id, COUNT(e.id)::int AS tech_done
      FROM assignments a
      JOIN event_selectors es ON es.id = a.event_selector_id AND es.selector_type = 'TECHNICAL'
      JOIN evaluations e ON e.assignment_id = a.id AND e.decision <> 'PENDING'
      GROUP BY a.candidate_id
    ) tech_counts ON tech_counts.candidate_id = c.id
    WHERE c.event_id = $1 AND c.status = 'PENDING'
    ORDER BY c.created_at ASC
    LIMIT $4
    `,
    [eventId, requiredRh, requiredTech, limit]
  );
  return rows;
}
