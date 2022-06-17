import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AppLogger } from '../logger/app.logger';

/**
 * Exception service
 */
@Injectable()
export class ExceptionService {

  private readonly logger: AppLogger;

  public constructor(logger: AppLogger) {
    this.logger = logger;
  }

  /**
   * Creates a response body from the specified error
   * 
   * @param req Request
   * @param err Error
   * @returns Response body
   */
  public createResponseBody(req: Request, err: Error) {
    this.logger.error(`${err.name}: ${err.message}`, err.stack, this.constructor.name);
    return {
      message: err.message,
      from: req.url
    };
  }
}
