import 'dotenv/config';
import pool from '../src/config/db.js';

// Données de démonstration : un événement, quelques sélecteurs et candidatures.
async function run() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows: [admin] } = await client.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ('ETIC Benetic', 'admin@etic.dz', 'x', 'ADMIN') RETURNING id`
    );

    const { rows: [event] } = await client.query(
      `INSERT INTO events (name, description, quota_total, required_rh_evals, required_tech_evals, closes_at)
       VALUES ('Training Camp XIII', 'Sélection des participants', 80, 1, 1, '2026-01-20T23:59:59Z')
       RETURNING id`
    );

    const selectorsData = [
      { name: 'Sara Benali', email: 'sara@etic.dz', type: 'RH' },
      { name: 'Ahmed Khelifi', email: 'ahmed@etic.dz', type: 'TECHNICAL' },
    ];
    const selectorIds = [];
    for (const s of selectorsData) {
      const { rows: [user] } = await client.query(
        `INSERT INTO users (full_name, email, password_hash, role)
         VALUES ($1, $2, 'x', 'SELECTOR') RETURNING id`,
        [s.name, s.email]
      );
      const { rows: [es] } = await client.query(
        `INSERT INTO event_selectors (event_id, user_id, selector_type)
         VALUES ($1, $2, $3) RETURNING id`,
        [event.id, user.id, s.type]
      );
      selectorIds.push(es.id);
    }

    for (let i = 1; i <= 10; i += 1) {
      const { rows: [candidate] } = await client.query(
        `INSERT INTO candidates (event_id, full_name, email) VALUES ($1, $2, $3) RETURNING id`,
        [event.id, `Candidat ${i}`, `candidat${i}@example.com`]
      );
      for (const esId of selectorIds) {
        const { rows: [assignment] } = await client.query(
          `INSERT INTO assignments (candidate_id, event_selector_id) VALUES ($1, $2) RETURNING id`,
          [candidate.id, esId]
        );
        if (i <= 6) {
          const decision = i % 3 === 0 ? 'REJECTED' : 'ACCEPTED';
          await client.query(
            `INSERT INTO evaluations (assignment_id, decision, comment) VALUES ($1, $2, 'Évaluation de démonstration')`,
            [assignment.id, decision]
          );
        }
      }
    }

    await client.query('COMMIT');
    console.log(`Données insérées. adminId=${admin.id} eventId=${event.id}`);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
