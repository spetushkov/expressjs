import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';

export const CookieParser = (): RequestHandler => cookieParser();
