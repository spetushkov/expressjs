export class AppException extends Error {
  readonly status: number;
  readonly message: string;
  readonly name: string;

  constructor(status: number, message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppException);
    }

    this.name = 'ApplicationError';
    this.status = status;
    this.message = message;
  }
}
