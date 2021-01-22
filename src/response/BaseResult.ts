import { HttpError } from '../server/express/exception/ServerException';
import { Result } from './Result';

export class BaseResult<T> implements Result<T, HttpError> {
  readonly data?: T | T[];
  readonly error?: HttpError;

  constructor(data?: T | T[], error?: HttpError) {
    this.data = data;
    this.error = error;
  }
}
