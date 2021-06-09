import { Paginateable } from './Paginateable';

export class Paginator implements Paginateable {
  readonly pageSizeLimit: number;
  readonly collectionSize: number;
  pageSize?: number;
  readonly totalPages: number;
  readonly firstPage: number;
  readonly lastPage: number;
  readonly currentPage: number;
  readonly nextPage?: number | null;
  readonly previousPage?: number | null;

  constructor(currentPage = '1', pageSizeLimit = '25', collectionSize = 0) {
    this.pageSizeLimit = Number(pageSizeLimit);
    this.collectionSize = collectionSize;
    this.totalPages = this.getTotalPages(this.collectionSize, this.pageSizeLimit);
    this.firstPage = 1;
    this.lastPage = this.totalPages;
    this.currentPage = this.getCurrentPage(currentPage, this.firstPage, this.lastPage);
    this.previousPage = this.getPreviousPage(this.currentPage, this.firstPage);
    this.nextPage = this.getNextPage(this.currentPage, this.lastPage);
  }

  private getCurrentPage(currentPage: string, firstPage: number, lastPage: number): number {
    const currentPageParsed = parseInt(currentPage, 10);

    if (currentPageParsed > lastPage) {
      return lastPage;
    }

    if (currentPageParsed < firstPage) {
      return firstPage;
    }

    return currentPageParsed;
  }

  private getNextPage(currentPage: number, lastPage: number): number | null {
    const nextPage = currentPage + 1;
    return nextPage > lastPage ? null : nextPage;
  }

  private getPreviousPage(currentPage: number, firstPage: number): number | null {
    const previousPage = currentPage - 1;
    return previousPage < firstPage ? null : previousPage;
  }

  private getTotalPages(collectionSize: number, pageSizeLimit: number): number {
    const total = Math.ceil(collectionSize / pageSizeLimit);
    return total === 0 ? 1 : total;
  }

  getSkipCount(): number {
    return this.pageSizeLimit * (this.currentPage - 1);
  }

  isPartialContent(): boolean {
    return this.totalPages > 1;
  }
}
