import { Rel } from './hateoas.types';

/**
 * HATEOAS error
 */
export class HateoasError extends Error {

  /**
   * Creates a new HATEOAS error
   * 
   * @param rel Unsupported rel
   */
  public constructor(rel: Rel) {
    super(`Rel "${rel}" is not supported`);
    this.name = 'HateoasError';
  }
}
