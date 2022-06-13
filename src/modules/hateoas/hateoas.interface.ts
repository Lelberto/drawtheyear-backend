import { Link } from './hateoas.types';

/**
 * HATEOAS to use with entities
 * 
 * This interface adds HATEOAS properties to the entity.
 */
export interface Hateoas {
  _links: Link[];
}
