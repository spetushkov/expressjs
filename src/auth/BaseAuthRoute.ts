import express, { NextFunction, Request, Response, Router } from 'express';
import { Route } from '../server/express/route/Route';
import { AuthController } from './AuthController';
import { AuthRoute } from './AuthRoute';

export abstract class BaseAuthRoute implements AuthRoute, Route {
  private controller: AuthController;
  private router: Router;

  constructor(controller: AuthController) {
    this.controller = controller;
    this.router = express.Router();
  }

  abstract getBaseUrl(): string;

  registerRoutes(): Router {
    this.router.post(`${this.getBaseUrl()}/signUp`, this.signUp);
    this.router.post(`${this.getBaseUrl()}/signIn`, this.signIn);
    this.router.get(`${this.getBaseUrl()}/signOut`, this.signOut);
    return this.router;
  }

  signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.signUp(req, res);
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.signIn(req, res);
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.controller.signOut(req, res);
    } catch (error) {
      next(error);
    }
  };
}
