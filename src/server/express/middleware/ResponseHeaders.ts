import { NextFunction, Request, Response } from 'express';

export const ResponseHeaders = (
  allowOrigin: string,
  allowHeaders: string,
  allowMethods: string,
) => (_: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', allowOrigin);
  res.header('Access-Control-Allow-Headers', allowHeaders);
  res.header('Access-Control-Allow-Methods', allowMethods);
  next();
};
