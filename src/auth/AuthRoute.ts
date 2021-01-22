import { NextFunction, Request, Response } from 'express';

export interface AuthRoute {
  signUp(req: Request, res: Response, next: NextFunction): Promise<void>;
  signIn(req: Request, res: Response, next: NextFunction): Promise<void>;
  signOut(req: Request, res: Response, next: NextFunction): Promise<void>;
}
