import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

/**
 * Filter for `EntityNotFoundError`
 * 
 * This filter translates `EntityNotFoundError` to `NotFoundException`.
 */
@Catch(EntityNotFoundError, Error)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

  public catch(ex: EntityNotFoundError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const newEx = new NotFoundException(ex.message);
    return res.status(newEx.getStatus()).json(newEx.getResponse());
  }
}
