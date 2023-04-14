import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findUserPayment(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function findPaymentAndEnrollment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
    include: { Ticket: { include: { Enrollment: true } } },
  });
}

const paymentRepository = {
  findUserPayment,
  findPaymentAndEnrollment,
};

export default paymentRepository;
