import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/tickets-repository';

export type FindPaymentParams = {
  userId: number;
  ticketId: number;
};

async function findUserPayment({ ticketId, userId }: FindPaymentParams) {
  if (!ticketId) throw invalidDataError(['invalid ticket id']);

  const ticket = await ticketRepository.findTicketAndEnrollment(ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentRepository.findUserPayment(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = {
  findUserPayment,
};

export default paymentsService;
