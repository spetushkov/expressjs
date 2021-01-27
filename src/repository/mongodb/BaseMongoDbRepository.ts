import { Document, Model } from 'mongoose';
import { PageRequest } from '../pagination/PageRequest';
import { PageResult } from '../pagination/PageResult';
import { Paginator } from '../pagination/Paginator';
import { Repository } from '../Repository';
import { MongoDbResult } from './MongoDbResult';

export abstract class BaseMongoDbRepository<T> implements Repository<T> {
  private mongooseModel: Model<Document, {}>;

  constructor(mongooseModel: Model<Document, {}>) {
    this.mongooseModel = mongooseModel;
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<T>> {
    try {
      const { query, sort, page, pageLimit } = pageRequest;

      const collectionSize = await this.mongooseModel.countDocuments(query);

      const paginator = new Paginator(page, pageLimit, collectionSize);

      const docs = await this.mongooseModel
        .find(query)
        .limit(paginator.pageSizeLimit)
        .skip(paginator.getSkipCount())
        .sort(sort);

      paginator.pageSize = docs.length;

      const docsObject = docs.map((doc) => doc.toObject());
      const entities = this.normalize(docsObject) as T[];
      const result = new PageResult(entities, paginator);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: string): Promise<T> {
    try {
      const doc = await this.mongooseModel.findById(id);
      const docObj = doc ? doc.toObject() : null;
      const entity = this.normalize(docObj) as T;
      return Promise.resolve(entity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async save(entity: T): Promise<T> {
    try {
      const doc = new this.mongooseModel(entity);
      const docSaved = await doc.save();
      const docUpdated = await this.postSave(docSaved);
      const entityUpdated = this.normalize(docUpdated.toObject()) as T;
      return Promise.resolve(entityUpdated);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected async postSave(doc: Document): Promise<Document> {
    return doc;
  }

  async updateById(id: string, query: Object): Promise<T> {
    try {
      const docUpdated = await this.mongooseModel.findByIdAndUpdate(id, query, {
        new: true,
      });
      const docObj = docUpdated ? docUpdated.toObject() : null;
      const entityUpdated = this.normalize(docObj) as T;
      return Promise.resolve(entityUpdated);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteById(id: string): Promise<T> {
    try {
      const docDeleted = await this.mongooseModel.findByIdAndDelete(id);
      const entityDeleted = this.normalize(docDeleted) as T;
      return Promise.resolve(entityDeleted);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(query: Object): Promise<T> {
    try {
      const doc = await this.mongooseModel.findOne(query);
      const entity = this.normalize(doc) as T;
      return Promise.resolve(entity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected abstract normalize(dbResult: MongoDbResult | null): T | T[];
}
