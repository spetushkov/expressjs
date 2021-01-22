import { Result } from '../../response/Result';
import { Paginateable } from './Paginateable';

export interface PageableResult<T, E> extends Result<T, E> {
  data: T[];
  paginator: Paginateable;
  error?: E;
}
