import { Document } from 'mongoose';

export type MongoDbResult = Pick<Document, '_id'> | Pick<Document, '_id'>[];
