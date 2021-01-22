import cors from 'cors';
import { RequestHandler } from 'express';

export const Cors = (): RequestHandler => cors({ credentials: true, origin: true });
