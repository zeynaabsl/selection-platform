import { asyncHandler } from '../utils/asyncHandler.js';
import { getAdminDashboard, getSelectorDashboard } from '../services/dashboardService.js';

// GET /api/events/:eventId/dashboard — ADMIN uniquement (voir route).
export const getEventDashboard = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const data = await getAdminDashboard(eventId);
  res.json(data);
});

// GET /api/events/:eventId/my-dashboard — SELECTOR : req.user.id vient du JWT,
// jamais d'un paramètre client, donc impossible de consulter un autre sélecteur.
export const getMyDashboard = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const data = await getSelectorDashboard(eventId, req.user.id);
  res.json(data);
});
