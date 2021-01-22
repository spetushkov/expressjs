import { NextFunction, Request, Response } from 'express';
import { HttpError, ServerException } from '../exception/ServerException';

export const ServerExceptionHandler = (
  error: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  ServerException.handle(error, res);
};
