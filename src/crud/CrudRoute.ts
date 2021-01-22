import { NextFunction, Request, Response } from 'express';

export interface CrudRoute {
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  findById(req: Request, res: Response, next: NextFunction): Promise<void>;
  save(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateById(req: Request, res: Response, next: NextFunction): Promise<void>;
  replaceById(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
