import { Router } from 'express';

export interface Route {
  registerRoutes(): Router;
  getBaseUrl(): string;
}
