import { ReasonPhrases } from 'http-status-codes';

export enum StatusCodeReason {
  OK = ReasonPhrases.OK,
  CREATED = ReasonPhrases.CREATED,
  NO_CONTENT = ReasonPhrases.NO_CONTENT,
  PARTIAL_CONTENT = ReasonPhrases.PARTIAL_CONTENT,
  BAD_REQUEST = ReasonPhrases.BAD_REQUEST,
  NOT_FOUND = ReasonPhrases.NOT_FOUND,
  CONFLICT = ReasonPhrases.CONFLICT,
  UNAUTHORIZED = ReasonPhrases.UNAUTHORIZED,
  FORBIDDEN = ReasonPhrases.FORBIDDEN,
  METHOD_NOT_ALLOWED = ReasonPhrases.METHOD_NOT_ALLOWED,
  NOT_IMPLEMENTED = ReasonPhrases.NOT_IMPLEMENTED,
  INTERNAL_SERVER_ERROR = ReasonPhrases.INTERNAL_SERVER_ERROR,
}
