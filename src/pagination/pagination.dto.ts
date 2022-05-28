import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for pagination represented in the request query
 */
export class PaginationDto {

  @ApiProperty()
  offset?: number;

  @ApiProperty()
  limit?: number;
}