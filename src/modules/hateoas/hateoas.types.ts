/**
 * HATEOAS link
 */
export type Link = {
  rel: string;
  method: Method;
  href: string;
}

/**
 * HTTP methods
 */
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  Patch = 'PATCH',
  DELETE = 'DELETE'
}
