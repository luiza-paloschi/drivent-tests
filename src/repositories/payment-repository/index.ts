import { Payment } from '@prisma/client';
import { prisma } from '@/config';
import { PaymentBody, PaymentData } from '@/services';

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

async function createPayment(data: PaymentData) {
  return await prisma.payment.create({
    data: data,
  });
}

const paymentRepository = {
  findUserPayment,
  findPaymentAndEnrollment,
  createPayment,
};

export default paymentRepository;
