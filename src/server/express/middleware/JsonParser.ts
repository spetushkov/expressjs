import express, { RequestHandler } from 'express';

export const JsonParser = (): RequestHandler => express.json();
