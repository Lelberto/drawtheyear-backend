import { ArgumentMetadata, Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common';
import moment from 'moment';
import { DayQueryDto } from '../entities/day.dto';

/**
 * Day query pipe
 * 
 * This pipe can only be used in the `@Query()` decorator. It will transform the query
 * object into a DayQueryDto object. If additional properties are found in the query
 * object, they will be ignored and returned.
 */
@Injectable()
export class DayQueryPipe implements PipeTransform<any, DayQueryDto> {
  
  public transform(query: any, metadata: ArgumentMetadata): DayQueryDto {
    if (metadata.type !== 'query') {
      throw new InternalServerErrorException(`${this.constructor.name} can only be used in the @Query() decorator`);
    }
    const currentYear = moment().year();
    return {
      from: query?.from || moment(`${currentYear}-01-01`).format('YYYY-MM-DD'),
      to: query?.to || moment(`${currentYear}-12-31`).format('YYYY-MM-DD'),
      ...query
    };
  }
}
