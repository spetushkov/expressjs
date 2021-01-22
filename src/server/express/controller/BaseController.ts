import { ClassValidator } from '../../../class/ClassValidator';
import { ApiEntity } from '../../../entity/ApiEntity';
import { StatusCode } from '../../../response/StatusCode';
import { ServerException } from '../exception/ServerException';

export abstract class BaseController<T extends ApiEntity> {
  protected async normalizeRequestBody(
    body: Object,
    skipMissingProperties: boolean,
  ): Promise<T | T[]> {
    try {
      const entity = this.normalize(body);
      await this.validate(entity, skipMissingProperties);
      return entity;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected abstract normalize(entity: Object | null): T;

  protected async validate(entity: Object, skipMissingProperties: boolean): Promise<boolean> {
    try {
      const messages = await ClassValidator.validate(entity, skipMissingProperties);
      if (messages.length > 0) {
        return Promise.reject(ServerException.create(StatusCode.BAD_REQUEST, messages.join('; ')));
      }
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
