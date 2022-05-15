import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Link } from '../modules/hateoas/hateoas.types';

/**
 * Transform interceptor
 * 
 * This interceptor will transform response and separate data (resources) and
 * technical information (pagination, HATEOAS, ...).
 * 
 * Example result response :
 * ```JSON
 * {
 *  "data": {
 *   "user": {
 *    "id": ...,
 *    "name": ...
 *   }
 *  },
 *  "links": [...]
 * }
 * ```
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor<Request, Response> {

  public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(data => {
      // Define base data if undefined (when no content is sent) or if some properties are not set (like pagination, HATEOAS, ...)
      if (!data) {
        data = {
          links: null,
        }
      } else {
        data.links = data?.links || null;
      }

      const { links, ...rest } = data;
      const resData: { data?: any, links?: Link[] } = {};

      // Define response data
      if (rest && Object.keys(rest).length > 0) {
        resData.data = rest;
      }
      if (links) {
        resData.links = links;
      }
      
      return Object.keys(resData).length > 0 ? resData : null; // Send null if no data (no content)
    }));
  }
}
