import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

/**
 * DTO for pagination represented in the request query
 */
export class PaginationDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  offset?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number;
}