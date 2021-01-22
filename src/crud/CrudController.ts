import { IncomingMessage, ServerResponse } from 'http';

export interface CrudController {
  findAll(req: IncomingMessage, res: ServerResponse): Promise<void>;
  findById(req: IncomingMessage, res: ServerResponse): Promise<void>;
  save(req: IncomingMessage, res: ServerResponse): Promise<void>;
  updateById(req: IncomingMessage, res: ServerResponse): Promise<void>;
  replaceById(req: IncomingMessage, res: ServerResponse): Promise<void>;
  deleteById(req: IncomingMessage, res: ServerResponse): Promise<void>;
}
