import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Link } from 'src/hateoas/hateoas.types';

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
    return next.handle().pipe(map(({ links, ...data }) => {
        const res: { data: any, links?: Link[] } = { data };
        if (links) {
          res.links = links;
        }
        return res;
      }));
  }
}
