import { Global, Module } from '@nestjs/common';
import { AccessLogger } from './access.logger';
import { AppLogger } from './app.logger';
import { DatabaseLogger } from './database.logger';

/**
 * Logging module
 * 
 * This module provides all used loggers for the application.
 */
@Global()
@Module({
  providers: [AppLogger, AccessLogger, DatabaseLogger],
  exports: [AppLogger, AccessLogger, DatabaseLogger]
})
export class LoggerModule {}
