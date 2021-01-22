import { ClassTransformer } from '../../class/ClassTransformer';
import { PageRequestable } from './PageRequestable';

export class PageRequest implements PageRequestable {
  readonly query: Object;
  readonly sort?: string;
  readonly page?: string;
  readonly pageLimit?: string;

  constructor(query = {}, sort?: string, page?: string, pageLimit?: string) {
    this.query = ClassTransformer.toPlain(query);
    this.sort = sort;
    this.page = page;
    this.pageLimit = pageLimit;
  }
}
