import { NextFunction, RequestHandler, Response } from 'express';
import { AccessTokenManager } from '../../../auth/accessToken/AccessTokenManager';
import { AccessTokenService } from '../../../auth/accessToken/AccessTokenService';
import { AuthService } from '../../../auth/AuthService';
import { AuthUser } from '../../../auth/AuthUser';
import { AuthData } from '../../../auth/response/AuthData';
import { ServerException } from '../exception/ServerException';
import { BaseRequest } from '../route/BaseRequest';

export const Authenticate = (
  authService: AuthService<AuthUser, AuthData>,
): RequestHandler => async (req: BaseRequest, res: Response, next: NextFunction) => {
  try {
    const token = AccessTokenManager.getFromRequest(req);
    const payload = AccessTokenService.verify(token, authService.getSecret());
    const userEntity = await authService.findById(payload.userId);
    if (!userEntity) {
      throw ServerException.InvalidAuthenticationTokenException();
    }

    req.user = userEntity;
    next();
  } catch (error) {
    next(error);
  }
};
