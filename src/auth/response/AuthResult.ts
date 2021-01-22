import { Result } from '../../response/Result';
import { HttpError } from '../../server/express/exception/ServerException';

export class AuthResult<T> implements Result<T, HttpError> {
  readonly data?: T;
  readonly error?: HttpError;

  constructor(data?: T, error?: HttpError) {
    this.data = data;
    this.error = error;
  }
}
