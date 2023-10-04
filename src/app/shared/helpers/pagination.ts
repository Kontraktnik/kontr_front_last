export interface IPagination<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  firstPage:number;
  lastPage:number;
  data: T[];
}
