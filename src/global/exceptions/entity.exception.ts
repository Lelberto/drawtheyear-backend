import { NotFoundException } from '@nestjs/common';
import { Constructor } from '../../utils/types';

/**
 * Entity not found exception
 */
export class EntityNotFoundException extends NotFoundException {

  public constructor(entityClass?: Constructor<any>) {
    super(`${entityClass?.name || 'Entity'} not found`);
  }
}
