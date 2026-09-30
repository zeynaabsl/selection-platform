import pool from '../config/db.js';

export async function findEventById(eventId) {
  const { rows } = await pool.query(
    `SELECT id, name, description, quota_total, required_rh_evals, required_tech_evals, closes_at
     FROM events WHERE id = $1`,
    [eventId]
  );
  return rows[0] || null;
}
