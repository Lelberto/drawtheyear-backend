import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { HateoasError } from './hateoas.error';
import { Link, Method, Rel, RelParams } from './hateoas.types';


/**
 * HATEOAS service
 * 
 * This service can be used to create HATEOAS links when sending a response.
 */
@Injectable()
export class HateoasService {

  private readonly port: number;

  public constructor(config: ConfigService) {
    this.port = config.get('PORT');
  }

  /**
   * Creates a HATEOAS link
   * 
   * @param req Request
   * @param rel Rel
   * @param params Link parameters
   * @returns Link
   */
  public createLink<T extends Rel>(req: Request, rel: T, params: RelParams[T]): Link {
    let method: Method;
    let href: string;

    switch (rel) {
      case 'user-self':
        method = 'GET';
        href = `/users/${(params as RelParams['user-self']).userId}`;
        break;
      case 'user-emotions':
        method = 'GET';
        href = `/users/${(params as RelParams['user-emotions']).userId}/emotions`;
        break;
      case 'user-days':
        method = 'GET';
        href = `/users/${(params as RelParams['user-days']).userId}/days`;
        break;
      case 'emotion-self':
        method = 'GET';
        href = `/emotions/${(params as RelParams['emotion-self']).emotionId}`;
        break;
      case 'day-self':
        const { userId, dayDate } = params as RelParams['day-self'];
        method = 'GET';
        href = `/users/${userId}/days/${dayDate}`;
        break;
      default: throw new HateoasError(rel);
    }

    return { rel, method, href: this.formatHref(req, href) };
  }

  /**
   * Formats a href
   * 
   * This method will add protocol, hostname and port (if not 80) to the href.
   * 
   * @param req Request
   * @param href href url
   * @returns Formatted href
   */
  private formatHref(req: Request, href: string): string {
    return `${req.protocol}://${req.hostname}${this.formatPort()}${href}`;
  }

  /**
   * Formats the port
   * 
   * This methos will format the port, except if it is 80.
   * 
   * @returns Formatted port
   */
  private formatPort(): string {
    return this.port === 80 ? '' : `:${this.port}`;
  }
}
