import { IncomingMessage, ServerResponse } from 'http';

export interface AuthController {
  signUp(req: IncomingMessage, res: ServerResponse): Promise<void>;
  signIn(req: IncomingMessage, res: ServerResponse): Promise<void>;
  signOut(req: IncomingMessage, res: ServerResponse): Promise<void>;
}
