import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';

async function getTicketTypes() {
  const types = await ticketRepository.findTicketTypes();
  return types;
}

export type CreateTicketParams = {
  userId: number;
  ticketTypeId: number;
  status: TicketStatus;
};

async function createTicket(params: CreateTicketParams) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(params.userId);
  if (!enrollment) throw notFoundError();

  const { ticketTypeId, status } = params;
  const newTicket = await ticketRepository.createTicket(ticketTypeId, enrollment.id, status);

  return newTicket;
}

async function findUserTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findUserTicket(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  getTicketTypes,
  createTicket,
  findUserTicket,
};

export default ticketsService;
