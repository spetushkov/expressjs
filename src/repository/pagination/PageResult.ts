import { HttpError } from '../../server/express/exception/ServerException';
import { PageableResult } from './PageableResult';
import { Paginator } from './Paginator';

export class PageResult<T> implements PageableResult<T, HttpError> {
  readonly data: T[];
  readonly paginator: Paginator;
  readonly error?: HttpError;

  constructor(data: T[], paginator: Paginator, error?: HttpError) {
    this.data = data;
    this.paginator = paginator;
    this.error = error;
  }
}
