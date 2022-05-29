import { ArgumentMetadata, Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig } from '../modules/config/server';
import { PaginationDto } from './pagination.dto';

/**
 * Pagination pipe
 * 
 * This pipe can only be used in the `@Query()` decorator. It will transform the query
 * object into a PaginationDto object. If additional properties are found in the query
 * object, they will be ignored and returned.
 */
@Injectable()
export class PaginationPipe implements PipeTransform<any, PaginationDto> {

  private readonly config: ServerConfig;

  public constructor(configService: ConfigService) {
    this.config = configService.get('server');
  }

  public transform(query: any, metadata: ArgumentMetadata): PaginationDto {
    if (metadata.type !== 'query') {
      throw new InternalServerErrorException(`${this.constructor.name} can only be used in @Query() decorator`);
    }
    const { pagination } = this.config;
    const offset = query?.offset || 0;
    let limit = query?.limit || pagination.maxLimit;
    if (limit > pagination.maxLimit) {
      limit = pagination.maxLimit;
    }
    return { offset, limit, ...query };
  }
}
