import express, { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { ApiEntity } from '../entity/ApiEntity';
import { Route } from '../server/express/route/Route';
import { BaseCrudController } from './BaseCrudController';
import { CrudRoute } from './CrudRoute';

export abstract class BaseCrudRoute<T extends ApiEntity> implements CrudRoute, Route {
  protected controller: BaseCrudController<T>;
  protected router: Router;

  constructor(controller: BaseCrudController<T>) {
    this.controller = controller;
    this.router = express.Router();
  }

  registerRoutes(): Router {
    this.router
      .all(`${this.getBaseUrl()}*`, this.allHandlers('all'))
      .get(`${this.getBaseUrl()}`, this.findAllHandlers('findAll'))
      .get(`${this.getBaseUrl()}/:id`, this.findByIdHandlers('findById'));

    this.router
      .all(`${this.getBaseUrl()}*`, this.allMutateHandlers('allMutate'))
      .post(`${this.getBaseUrl()}`, this.saveHandlers('save'))
      .patch(`${this.getBaseUrl()}/:id`, this.updateByIdHandlers('updateById'))
      .put(`${this.getBaseUrl()}/:id`, this.replaceByIdHandlers('replaceById'))
      .delete(`${this.getBaseUrl()}/:id`, this.deleteByIdHandlers('deleteById'));

    return this.router;
  }

  protected allHandlers = (handlerId?: string): RequestHandler[] => [this.all];
  protected findAllHandlers = (handlerId?: string): RequestHandler[] => [this.findAll];
  protected findByIdHandlers = (handlerId?: string): RequestHandler[] => [this.findById];

  protected allMutateHandlers = (handlerId?: string): RequestHandler[] => [this.allMutate];
  protected saveHandlers = (handlerId?: string): RequestHandler[] => [this.save];
  protected updateByIdHandlers = (handlerId?: string): RequestHandler[] => [this.updateById];
  protected replaceByIdHandlers = (handlerId?: string): RequestHandler[] => [this.replaceById];
  protected deleteByIdHandlers = (handlerId?: string): RequestHandler[] => [this.deleteById];

  abstract getBaseUrl(): string;

  all = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next();
  };

  findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.findAll(req, res);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.findById(req, res);
    } catch (error) {
      next(error);
    }
  };

  allMutate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next();
  };

  save = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.save(req, res);
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.updateById(req, res);
    } catch (error) {
      next(error);
    }
  };

  replaceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.replaceById(req, res);
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.deleteById(req, res);
    } catch (error) {
      next(error);
    }
  };
}
