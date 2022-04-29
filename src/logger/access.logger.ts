import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { AppLogger } from './app.logger';

/**
 * Access logger
 * 
 * This logger is used to log access to the application (requests and responses).
 * 
 * Logs are written in the `LOGGING_ACCESS_FILE` environment variable path.
 */
@Injectable()
export class AccessLogger extends AppLogger {

  public constructor(config: ConfigService) {
    super(config, 'Access');
    this.logPath = path.join(this.config.dir, this.config.files.access);
  }
}
