import { Global, Module } from '@nestjs/common';
import { AccessLogger } from './access.logger';
import { AppLogger } from './app.logger';

/**
 * Logging module
 * 
 * This module provides all used loggers for the application.
 */
@Global()
@Module({
  providers: [AppLogger, AccessLogger],
  exports: [AppLogger, AccessLogger]
})
export class LoggerModule {}
