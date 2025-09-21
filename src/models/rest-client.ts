export type Methods = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';
export type RestHeaders = Record<string, string>;
export interface RestData {
  method: Methods | null;
  url: string | null;
  headers: RestHeaders;
  body?: string | null;
}
