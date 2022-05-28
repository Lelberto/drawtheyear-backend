import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ActionBuilder } from './actions/action.builder';


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
   * Creates a new action builder
   * 
   * @param req Request
   * @returns Created action builder
   */
  public createActionBuilder(req: Request): ActionBuilder {
    return new ActionBuilder({ hrefPrefix: this.createHrefPrefix(req) });
  }

  /**
   * Creates a href prefix from the given request 
   * 
   * This method will return protocol, hostname and port (if not 80).
   * 
   * @param req Request
   * @returns Formatted href prefix to `protocol://hostname:port`
   */
  private createHrefPrefix(req: Request): string {
    return `${req.protocol}://${req.hostname}${this.formatPort()}`;
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
