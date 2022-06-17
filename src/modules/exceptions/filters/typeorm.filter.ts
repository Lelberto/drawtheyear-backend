import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound';
import { UpdateValuesMissingError } from 'typeorm/error/UpdateValuesMissingError';
import { ExceptionService } from '../exception.service';

/**
 * Filter for TypeORM errors
 * 
 * This filter will log exceptions and send a formatted response
 */
@Catch(EntityColumnNotFound, UpdateValuesMissingError)
export class TypeOrmExceptionFilter implements ExceptionFilter<EntityColumnNotFound | UpdateValuesMissingError> {

  private readonly exceptionService: ExceptionService;

  public constructor(exceptionService: ExceptionService) {
    this.exceptionService = exceptionService;
  }

  public catch(err: EntityColumnNotFound | UpdateValuesMissingError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    if (err instanceof EntityColumnNotFound) {
      err.message = 'Invalid data';
    } else if (err instanceof UpdateValuesMissingError) {
      err.message = 'Missing data';
    }

    return res.status(400).json(this.exceptionService.createResponseBody(req, err));
  }
}
