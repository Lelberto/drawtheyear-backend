import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionService } from '../exception.service';

/**
 * Filter for all HTTP exceptions
 * 
 * This filter will log exceptions and send a formatted response
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {

  private readonly exceptionService: ExceptionService;

  public constructor(exceptionService: ExceptionService) {
    this.exceptionService = exceptionService;
  }

  public catch(err: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    return res.status(err.getStatus()).json(this.exceptionService.createResponseBody(req, err));
  }
}
