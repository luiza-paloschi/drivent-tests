import { Router } from 'express';
import { findPayment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', findPayment);

export { paymentsRouter };
