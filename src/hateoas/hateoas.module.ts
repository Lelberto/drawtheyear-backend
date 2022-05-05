import { Module } from '@nestjs/common';
import { HateoasService } from './hateoas.service';

/**
 * HATEOAS module
 */
@Module({
  providers: [HateoasService],
  exports: [HateoasService]
})
export class HateoasModule {}
