import { ConsoleLogger, Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggingConfig } from 'config/logging';
import { appendFile, mkdir, stat } from 'fs/promises';
import * as moment from 'moment';
import * as path from 'path';

/**
 * Application logger
 * 
 * This is the default logger.
 * 
 * Logs are written in the `LOGGING_APPLICATION_FILE` environment variable path.
 */
@Injectable()
export class AppLogger extends ConsoleLogger implements LoggerService {

  protected readonly config: LoggingConfig;
  protected logPath: string;

  public constructor(config: ConfigService, context?: string) {
    super(context || 'Application');
    this.config = config.get('logging');
    this.logPath = path.join(this.config.dir, this.config.files.application);
  }

  protected printMessages(messages: unknown[], context?: string, logLevel?: LogLevel, writeStreamType?: 'stdout' | 'stderr'): void {
    super.printMessages(messages, context, logLevel, writeStreamType);
    if (this.logPath) {
      this.writeFile(messages, context, logLevel);
    }
  }

  protected colorize(message: string, logLevel: LogLevel): string {
    return message; // Remove colorization
  }

  protected getTimestamp(): string {
    return moment().format(this.config.dateFormat);
  }

  /**
   * Writes log messages into the log file.
   * 
   * @async
   */
  private async writeFile(messages: unknown[], context?: string, logLevel?: LogLevel): Promise<void> {
    const logDir = path.dirname(this.logPath);
    const logDirExists = await stat(logDir).then(() => true).catch(() => false);

    if (!logDirExists) {
      await mkdir(logDir, { recursive: true });
    }

    messages.forEach(async message => {
      const pidMessage = this.formatPid(process.pid);
      const contextMessage = context ? `[${context}] ` : '';
      const formattedLogLevel = logLevel.toUpperCase().padStart(2, ' ');
      const formatedMessage = this.formatMessage(logLevel, message, pidMessage, formattedLogLevel, contextMessage, '');
      await appendFile(this.logPath, formatedMessage);
    });
  }
}
