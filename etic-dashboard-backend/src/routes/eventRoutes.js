import { Router } from 'express';
import dashboardRoutes from './dashboardRoutes.js';

const router = Router();

router.use('/:eventId', dashboardRoutes);

export default router;
