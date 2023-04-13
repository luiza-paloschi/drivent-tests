import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function findTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;

  try {
    const createdTicket = await ticketsService.createTicket({
      userId: req.userId,
      ticketTypeId,
      status: 'RESERVED',
    });
    return res.status(httpStatus.CREATED).send(createdTicket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function findUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userTicket = await ticketsService.findUserTicket(userId);
    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
