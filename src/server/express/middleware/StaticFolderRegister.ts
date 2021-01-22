import express, { RequestHandler } from 'express';
import path from 'path';

export const StaticFolderRegister = (dirName: string): RequestHandler =>
  express.static(path.join(path.resolve(), dirName));
