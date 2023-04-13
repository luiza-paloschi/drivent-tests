import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketTypes() {
  return await prisma.ticketType.findMany();
}

async function createTicket(ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findUserTicket(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  findTicketTypes,
  createTicket,
  findUserTicket,
};

export default ticketRepository;
