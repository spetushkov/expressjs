import { Response } from 'express';
import { default as createHttpError } from 'http-errors';
import { ExceptionHandler } from '../../../exception/ExceptionHandler';
import { StatusCode } from '../../../response/StatusCode';
import { StatusCodeReason } from '../../../response/StatusCodeReason';

export type HttpError = createHttpError.HttpError;

export class ServerException {
  static create(status: StatusCode, message: string | StatusCodeReason): HttpError {
    return createHttpError(status, message);
  }

  static NotImplementedException(): HttpError {
    return this.create(StatusCode.NOT_IMPLEMENTED, StatusCodeReason.NOT_IMPLEMENTED);
  }

  static AlreadyExistsException(query: Object): HttpError {
    return this.create(StatusCode.CONFLICT, `Item already exists: ${JSON.stringify(query)}`);
  }

  static NotFoundException(): HttpError {
    return this.create(StatusCode.NOT_FOUND, StatusCodeReason.NOT_FOUND);
  }

  static MethodNotAllowedException(): HttpError {
    return this.create(StatusCode.METHOD_NOT_ALLOWED, StatusCodeReason.METHOD_NOT_ALLOWED);
  }

  static InvalidCredentialsException(): HttpError {
    return this.create(StatusCode.UNAUTHORIZED, 'Invalid credentials');
  }

  static MisssingAuthenticationTokenException(): HttpError {
    return this.create(StatusCode.UNAUTHORIZED, 'Misssing authentication token');
  }

  static InvalidAuthenticationTokenException(): HttpError {
    return this.create(StatusCode.UNAUTHORIZED, 'Invalid authentication token');
  }

  static InvalidAccessException(): HttpError {
    return this.create(StatusCode.UNAUTHORIZED, 'Invalid access');
  }

  static handle(error: HttpError, res: Response): void {
    ExceptionHandler.handle(error);
    let status = error.status;
    if (!status) {
      status = StatusCode.INTERNAL_SERVER_ERROR;
    }
    res.status(status).json({ error: error.message });
  }
}
