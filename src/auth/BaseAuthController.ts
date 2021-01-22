import { Request, Response } from 'express';
import { Cookie } from '../response/Cookie';
import { StatusCode } from '../response/StatusCode';
import { StatusCodeReason } from '../response/StatusCodeReason';
import { BaseController } from '../server/express/controller/BaseController';
import { ServerException } from '../server/express/exception/ServerException';
import { AccessToken } from './accessToken/AccessToken';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { AuthUser } from './AuthUser';
import { AuthData } from './response/AuthData';

export abstract class BaseAuthController<T extends AuthUser>
  extends BaseController<T>
  implements AuthController {
  private service: AuthService<T, AuthData>;

  constructor(service: AuthService<T, AuthData>) {
    super();
    this.service = service;
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const entity = (await this.normalizeRequestBody(req.body, false)) as T;

      const response = await this.service.signUp(entity);
      const { error, data } = response;
      if (error) {
        res.status(error.status).json(response);
        return;
      }

      if (data) {
        this.createAuthCookie(res, data.accessToken);
      }
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const entity = (await this.normalizeRequestBody(req.body, true)) as T;

      const response = await this.service.signIn(entity);
      const { error, data } = response;
      if (error) {
        res.status(error.status).json(response);
        return;
      }

      if (data) {
        this.createAuthCookie(res, data.accessToken);
      }
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signOut(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.service.signOut();
      if (!response) {
        const error = ServerException.create(
          StatusCode.INTERNAL_SERVER_ERROR,
          StatusCodeReason.INTERNAL_SERVER_ERROR,
        );
        res.status(error.status).json(response);
        return;
      }

      if (response) {
        this.removeAuthCookie(res);
      }
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private createAuthCookie(res: Response, authToken: AccessToken): void {
    res.cookie(Cookie.AUTHORIZATION, authToken.token, this.getAuthCookieConfig(authToken));
  }

  private removeAuthCookie(res: Response): void {
    res.clearCookie(Cookie.AUTHORIZATION, this.getAuthCookieConfig());
  }

  private getAuthCookieConfig(authToken?: AccessToken) {
    return {
      path: '/',
      maxAge: authToken ? authToken.expiresIn * 1000 : 0, // seconds to milliseconds
      httpOnly: this.authCookieConfigHttpOnly(),
      secure: this.authCookieConfigSecure(),
      sameSite: true,
    };
  }

  protected abstract authCookieConfigHttpOnly(): boolean;

  protected abstract authCookieConfigSecure(): boolean;
}
