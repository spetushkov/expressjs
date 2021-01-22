import express, { RequestHandler } from 'express';

export const UrlEncoder = (): RequestHandler => express.urlencoded({ extended: true });
