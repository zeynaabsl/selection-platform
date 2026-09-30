import AppError from '../utils/AppError.js';
import { findEventById } from '../db/eventRepository.js';
import { getCandidateStats, getEvaluationCounts, getPendingCandidates } from '../db/candidateRepository.js';
import { getSelectorsProgress, findEventSelector, getSelectorOwnStats, getSelectorRecentEvaluations } from '../db/selectorRepository.js';

const pct = (done, total) => (total > 0 ? Math.round((done / total) * 100) : 0);

async function loadEventOrFail(eventId) {
  const event = await findEventById(eventId);
  if (!event) throw new AppError('Événement introuvable.', 404);
  return event;
}

// Vision globale de l'événement, réservée à l'ADMIN (voir requireRole('ADMIN') sur la route).
export async function getAdminDashboard(eventId) {
  const event = await loadEventOrFail(eventId);
  const requiredRh = event.required_rh_evals;
  const requiredTech = event.required_tech_evals;

  const [candidateStats, evalCounts, selectors, pendingCandidates] = await Promise.all([
    getCandidateStats(eventId, requiredRh, requiredTech),
    getEvaluationCounts(eventId),
    getSelectorsProgress(eventId),
    getPendingCandidates(eventId, requiredRh, requiredTech),
  ]);

  const rhRequired = candidateStats.total * requiredRh;
  const techRequired = candidateStats.total * requiredTech;
  const remaining = candidateStats.total - candidateStats.fully_evaluated;

  return {
    event: { id: event.id, name: event.name, description: event.description },
    candidates: {
      total: candidateStats.total,
      assigned: candidateStats.assigned,
      fullyEvaluated: candidateStats.fully_evaluated,
      remaining,
      progress: pct(candidateStats.fully_evaluated, candidateStats.total),
    },
    results: {
      accepted: candidateStats.accepted,
      rejected: candidateStats.rejected,
      pending: candidateStats.pending,
    },
    evaluations: {
      rh: { completed: evalCounts.rh_done, required: rhRequired },
      technical: { completed: evalCounts.tech_done, required: techRequired },
      remaining: Math.max(0, rhRequired + techRequired - evalCounts.rh_done - evalCounts.tech_done),
    },
    quota: {
      total: event.quota_total,
      remaining: Math.max(0, event.quota_total - candidateStats.accepted),
    },
    selectors: selectors.map((s) => ({
      selectorId: s.event_selector_id,
      userId: s.user_id,
      name: s.name,
      type: s.type,
      assigned: s.assigned,
      evaluated: s.evaluated,
      remaining: s.assigned - s.evaluated,
      progress: pct(s.evaluated, s.assigned),
    })),
    pendingCandidates: pendingCandidates.map((c) => ({
      id: c.id,
      fullName: c.full_name,
      evaluationsDone: c.evaluations_done,
      evaluationsRequired: c.evaluations_required,
    })),
  };
}

// Vision personnelle d'un sélecteur : n'utilise JAMAIS un id venu du client,
// seulement userId issu du token vérifié (voir controller).
export async function getSelectorDashboard(eventId, userId) {
  const event = await loadEventOrFail(eventId);

  const eventSelector = await findEventSelector(eventId, userId);
  if (!eventSelector) {
    throw new AppError("Tu n'es pas sélecteur sur cet événement.", 403);
  }

  const [stats, recent] = await Promise.all([
    getSelectorOwnStats(eventSelector.id),
    getSelectorRecentEvaluations(eventSelector.id),
  ]);

  return {
    event: { id: event.id, name: event.name, description: event.description },
    selector: { type: eventSelector.type },
    stats: {
      assigned: stats.assigned,
      evaluated: stats.evaluated,
      remaining: stats.assigned - stats.evaluated,
      progress: pct(stats.evaluated, stats.assigned),
      accepted: stats.accepted,
      rejected: stats.rejected,
      pending: stats.pending,
    },
    recentEvaluations: recent.map((r) => ({
      candidateName: r.candidate_name,
      decision: r.decision,
      evaluatedAt: r.evaluated_at,
    })),
  };
}
