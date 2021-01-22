import { RequestHandler } from 'express';
import morgan from 'morgan';

export const HttpLogger = (): RequestHandler => morgan('dev');
