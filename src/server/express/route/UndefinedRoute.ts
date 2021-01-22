import { NextFunction, Request, Response } from 'express';
import { ServerException } from '../exception/ServerException';

export const UndefinedRoute = (_: Request, res: Response, next: NextFunction): void => {
  next(ServerException.NotFoundException());
};
