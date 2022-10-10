import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {

  public catch(ex: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    console.error(ex.constructor.name, ex.getResponse());
    res.status(ex.getStatus()).json({
      message: this.buildMessage(ex),
      from: req.originalUrl
    });
  }

  private buildMessage(ex: HttpException): string {
    let exResponse = ex.getResponse();
    if (typeof exResponse === 'object') {
      exResponse = (exResponse as any).message;
      if (Array.isArray(exResponse)) {
        exResponse = exResponse[0];
      }
    }
    return exResponse as string;
  }
}
