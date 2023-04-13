import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, findTicketTypes, findUserTicket } from '@/controllers';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', findTicketTypes)
  .post('/', validateBody(createTicketSchema), createTicket)
  .get('/', findUserTicket);
export { ticketsRouter };
