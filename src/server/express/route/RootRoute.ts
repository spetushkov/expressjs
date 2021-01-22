import express, { Request, Response, Router } from 'express';
import { StatusCode } from '../../../response/StatusCode';

export class RootRoute {
  static registerRoutes(): Router {
    const router = express.Router();
    router.get('/', (_: Request, res: Response) => {
      res.status(StatusCode.NO_CONTENT).send();
    });
    return router;
  }
}
