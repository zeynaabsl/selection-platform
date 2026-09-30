import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/permissions.js';
import { getEventDashboard, getMyDashboard } from '../controllers/dashboardController.js';

const router = Router({ mergeParams: true });

router.get('/dashboard', authenticate, requireRole('ADMIN'), getEventDashboard);
router.get('/my-dashboard', authenticate, requireRole('SELECTOR'), getMyDashboard);

export default router;
