import { Router } from 'express';
import { createPayment, findPayment } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { PaymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', findPayment)
  .post('/process', validateBody(PaymentSchema), createPayment);

export { paymentsRouter };
