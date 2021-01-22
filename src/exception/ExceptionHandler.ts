import { ExceptionLogger } from './ExceptionLogger';

export class ExceptionHandler {
  static handle(error: Error): void {
    ExceptionLogger.log(error);
  }
}
