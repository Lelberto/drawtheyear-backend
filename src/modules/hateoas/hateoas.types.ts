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

/**
 * HATEOAS to use with entities
 * 
 * This interface adds HATEOAS properties to the entity.
 */
 export interface Hateoas {
  _links: Link[];
}
