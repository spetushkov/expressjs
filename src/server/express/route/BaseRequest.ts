import { Request } from 'express';
import { AuthUser } from '../../../auth/AuthUser';

export interface BaseRequest extends Request {
  user?: AuthUser;
}
