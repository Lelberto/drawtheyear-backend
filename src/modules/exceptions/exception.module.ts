import { Module } from '@nestjs/common';
import { ExceptionService } from './exception.service';

/**
 * Exception module
 * 
 * This module is used to manage exceptions.
 */
@Module({
  providers: [ExceptionService],
  exports: [ExceptionService]
})
export class ExsceptionModule {}
