import jwt from 'jsonwebtoken';
import { ServerException } from '../../server/express/exception/ServerException';
import { DateUtils } from '../../utils/DateUtils';
import { AuthUser } from '../AuthUser';
import { AccessToken } from './AccessToken';
import { AccessTokenPayload } from './AccessTokenPayload';

export class AccessTokenService {
  static create(user: AuthUser, secret: string): AccessToken {
    const payload: AccessTokenPayload = {
      userId: user.id,
    };

    const expiresInSec = DateUtils.hoursInSeconds(8);

    const token = jwt.sign(payload, secret, { expiresIn: expiresInSec });

    return {
      token: token,
      expiresIn: expiresInSec,
      expiresAt: new Date(Date.now() + expiresInSec * 1000).toISOString(),
    };
  }

  static verify(token: string, secret: string): AccessTokenPayload {
    try {
      return jwt.verify(token, secret) as AccessTokenPayload;
    } catch (error) {
      throw ServerException.InvalidAuthenticationTokenException();
    }
  }
}
