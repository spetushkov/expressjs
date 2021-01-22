import { Request } from 'express';
import { Cookie } from '../../response/Cookie';
import { Header } from '../../response/Header';
import { ServerException } from '../../server/express/exception/ServerException';

export class AccessTokenManager {
  /**
   * @param req Should contain a HTTP Header = Cookie: Authorization={token}; HttpOnly; Max-Age={maxAgeSec},
   * or Should containt a HTTP Header = Authorization: Bearer ${token}
   */
  static getFromRequest(req: Request): string {
    let token = this.getFromRequestHeader(req);
    if (!token) {
      token = this.getFromRequestCookies(req);
    }

    if (!token) {
      throw ServerException.MisssingAuthenticationTokenException();
    }

    return token;
  }

  private static getFromRequestCookies(req: Request): string | null {
    const cookies = req.cookies;
    if (!cookies) {
      return null;
    }

    const token = cookies[Cookie.AUTHORIZATION];
    if (!token) {
      return null;
    }

    return token;
  }

  private static getFromRequestHeader(req: Request): string | null {
    const authHeader = req.headers[Header.AUTHORIZATION.toLowerCase()] as string;
    if (!authHeader) {
      return null;
    }

    let token: string | undefined;
    if (authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      return null;
    }

    return token;
  }
}
