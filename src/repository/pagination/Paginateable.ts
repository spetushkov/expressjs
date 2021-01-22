import { PageSizeLimit } from './PageSizeLimit';

export interface Paginateable {
  pageSizeLimit: PageSizeLimit;
  collectionSize: number;
  pageSize?: number;
  totalPages: number;
  firstPage: number;
  lastPage: number;
  currentPage: number;
  nextPage?: number | null;
  previousPage?: number | null;

  getSkipCount(): number;
  isPartialContent(): boolean;
}
