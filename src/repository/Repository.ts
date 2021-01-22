import { PageRequest } from './pagination/PageRequest';
import { PageResult } from './pagination/PageResult';

export interface Repository<T> {
  findAll(pageRequest: PageRequest): Promise<PageResult<T>>;
  findById(id: string): Promise<T>;
  findOne(query: Object): Promise<T>;
  save(entity: T): Promise<T>;
  updateById(id: string, query: Object): Promise<T>;
  deleteById(id: string): Promise<T>;
}
