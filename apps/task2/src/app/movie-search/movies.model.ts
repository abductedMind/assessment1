export interface PaginatedResponse<T = unknown> {
  page: string;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface CollectionRow {
  id: string;
  original_title: string;
  poster_path: string;
  [prop: string]: string;
}
