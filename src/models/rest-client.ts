export interface HeaderItem {
  key: string;
  value: string;
  on: boolean;
}

export type Methods = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';
export interface RestData {
  method: Methods;
  url: string;
  headers: HeaderItem[];
  body?: string;
}
