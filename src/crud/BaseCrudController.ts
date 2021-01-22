import { Response } from 'express';
import { ClassTransformer } from '../class/ClassTransformer';
import { ApiEntity } from '../entity/ApiEntity';
import { PageRequest } from '../repository/pagination/PageRequest';
import { PageRequestOptions } from '../repository/pagination/PageRequestOptions';
import { BaseResult } from '../response/BaseResult';
import { Header } from '../response/Header';
import { StatusCode } from '../response/StatusCode';
import { BaseController } from '../server/express/controller/BaseController';
import { ServerException } from '../server/express/exception/ServerException';
import { BaseRequest } from '../server/express/route/BaseRequest';
import { CrudController } from './CrudController';
import { CrudService } from './CrudService';

export abstract class BaseCrudController<T extends ApiEntity>
  extends BaseController<T>
  implements CrudController {
  protected service: CrudService<T>;

  constructor(service: CrudService<T>) {
    super();
    this.service = service;
  }

  async findAll(req: BaseRequest, res: Response): Promise<void> {
    try {
      this.preFindAll(req);

      const pageRequestOptions = await this.normalizePageRequestOptions(req.query);
      const { sort, page, pageLimit } = pageRequestOptions;
      const sortOptionUpdated = this.normalizeSortOption(sort);

      const query = await this.normalizeRequestQuery(req.query);

      const pageRequest = new PageRequest(query, sortOptionUpdated, page, pageLimit);

      const result = await this.service.findAll(pageRequest);

      let status = StatusCode.OK;
      if (result.paginator.isPartialContent()) {
        status = StatusCode.PARTIAL_CONTENT;
        res.setHeader(Header.X_TOTAL_COUNT, result.paginator.collectionSize);
      }

      res.status(status).json(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected preFindAll(req: BaseRequest): void {
    return;
  }

  private async normalizePageRequestOptions(query: Object): Promise<PageRequestOptions> {
    try {
      const entity = ClassTransformer.fromPlain(PageRequestOptions, query);
      await this.validate(entity, false);
      return entity;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private normalizeSortOption(sort?: string): string | undefined {
    if (!sort) {
      return undefined;
    }

    const delim = ' ';
    const sortUpdated: Record<string, unknown> = {};
    const sortKeys = sort.split(delim);
    sortKeys.forEach((sortKey) => {
      let sortKeyUpdated = sortKey;
      if (sortKeyUpdated.charAt(0) === '-') {
        sortKeyUpdated = sortKeyUpdated.substring(1);
      }
      sortUpdated[sortKeyUpdated] = sortKey;
    });

    const entity = this.normalize(sortUpdated);
    const entityPlain = ClassTransformer.toPlain(entity);
    const entityValues = Object.values(entityPlain);
    return entityValues.join(delim).trim();
  }

  private async normalizeRequestQuery(query: Object): Promise<Partial<T> | undefined> {
    try {
      const entity = this.normalizeRequestQueryParams(query);
      if (!entity) {
        return Promise.resolve(undefined);
      }

      await this.validate(entity, false);
      return entity;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected normalizeRequestQueryParams(query: Object | null): Partial<T> | undefined {
    return undefined;
  }

  async findById(req: BaseRequest, res: Response): Promise<void> {
    try {
      this.preFindById(req);

      const { id } = req.params;
      const entity = await this.service.findById(id);

      const response = new BaseResult(entity);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected preFindById(req: BaseRequest): void {
    return;
  }

  async save(req: BaseRequest, res: Response): Promise<void> {
    try {
      const entity = (await this.normalizeRequestBody(req.body, false)) as T;

      const entityUpdated = this.preSave(req, entity);
      const entitySaved = await this.service.save(entityUpdated);

      const { id } = entitySaved;
      res.setHeader(Header.LOCATION, `${req.originalUrl}/${id}`);
      const response = new BaseResult(entitySaved);
      res.status(StatusCode.CREATED).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected preSave(req: BaseRequest, entity: T): T {
    return entity;
  }

  async updateById(req: BaseRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const entity = (await this.normalizeRequestBody(req.body, true)) as T;

      let entityUpdated = this.preUpdate(req, entity);
      entityUpdated = await this.service.updateById(id, entityUpdated);

      const response = new BaseResult(entityUpdated);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected preUpdate(req: BaseRequest, entity: T): T {
    return entity;
  }

  async replaceById(req: BaseRequest, res: Response): Promise<void> {
    try {
      throw ServerException.MethodNotAllowedException();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteById(req: BaseRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.deleteById(id);

      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
