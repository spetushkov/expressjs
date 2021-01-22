import { StatusCodes as HttpStatusCodes } from 'http-status-codes';

export enum StatusCode {
  OK = HttpStatusCodes.OK,
  CREATED = HttpStatusCodes.CREATED,
  NO_CONTENT = HttpStatusCodes.NO_CONTENT,
  PARTIAL_CONTENT = HttpStatusCodes.PARTIAL_CONTENT,
  BAD_REQUEST = HttpStatusCodes.BAD_REQUEST,
  NOT_FOUND = HttpStatusCodes.NOT_FOUND,
  CONFLICT = HttpStatusCodes.CONFLICT,
  UNAUTHORIZED = HttpStatusCodes.UNAUTHORIZED,
  FORBIDDEN = HttpStatusCodes.FORBIDDEN,
  METHOD_NOT_ALLOWED = HttpStatusCodes.METHOD_NOT_ALLOWED,
  NOT_IMPLEMENTED = HttpStatusCodes.NOT_IMPLEMENTED,
  INTERNAL_SERVER_ERROR = HttpStatusCodes.INTERNAL_SERVER_ERROR,
}
