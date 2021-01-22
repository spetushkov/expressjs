import { ClassTransformer } from '../class/ClassTransformer';
import { BaseCrudService } from '../crud/BaseCrudService';
import { Repository } from '../repository/Repository';
import { ServerException } from '../server/express/exception/ServerException';
import { AccessTokenService } from './accessToken/AccessTokenService';
import { AuthService } from './AuthService';
import { AuthUser } from './AuthUser';
import { PasswordService } from './password/PasswordService';
import { AuthData } from './response/AuthData';
import { AuthResult } from './response/AuthResult';

export abstract class BaseAuthService<T extends AuthUser>
  extends BaseCrudService<T>
  implements AuthService<T, AuthData> {
  constructor(repository: Repository<T>) {
    super(repository);
  }

  async signUp(user: T): Promise<AuthResult<AuthData>> {
    try {
      const userUpdated = ClassTransformer.clone(user);
      userUpdated.password = await PasswordService.hash(user.password);

      const userEntity = await this.save(userUpdated);

      return Promise.resolve(new AuthResult(this.getAuthData(userEntity)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signIn(user: T): Promise<AuthResult<AuthData>> {
    try {
      const { email } = user;
      const userEntity = await this.repository.findOne({ email });
      if (!userEntity) {
        throw ServerException.InvalidCredentialsException();
      }

      if (!(await PasswordService.compare(user.password, userEntity.password))) {
        throw ServerException.InvalidCredentialsException();
      }

      return Promise.resolve(new AuthResult(this.getAuthData(userEntity)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signOut(): Promise<AuthResult<boolean>> {
    try {
      return Promise.resolve(new AuthResult(true));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(userId: string): Promise<T> {
    try {
      return await this.repository.findById(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  abstract getSecret(): string;

  private getAuthData(userEntity: T): AuthData {
    return {
      user: this.normalize(userEntity) as T,
      accessToken: AccessTokenService.create(userEntity, this.getSecret()),
    };
  }
}
