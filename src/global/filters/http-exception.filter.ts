import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from '../../modules/logger/app.logger';
import { ErrorResponse } from '../../utils/types';

/**
 * Filter for all HTTP exceptions
 * 
 * This filter will log exceptions and send a formatted response
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {

  private readonly logger: AppLogger;

  public constructor(logger: AppLogger) {
    this.logger = logger;
  }

  public catch(err: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const body: ErrorResponse = {
      message: err.message,
      from: req.url
    }

    this.logger.error(`${err.name}: ${err.message}`, err.stack, this.constructor.name);
    return res.status(err.getStatus()).json(body);
  }
}
