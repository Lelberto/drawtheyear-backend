import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger, QueryRunner } from 'typeorm';
import { AppLogger } from './app.logger';

/**
 * Database logger
 * 
 * This logger is used to log database queries.
 * 
 * Logs are written in the `LOGGING_DATABASE_FILE` environment variable path.
 */
@Injectable()
export class DatabaseLogger extends AppLogger implements Logger {

  public constructor(config: ConfigService) {
    super(config, 'Database');
    this.logPath = this.config.files.database;
  }

  public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.log(this.formatQuery(query, parameters));
  }

  public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.error(this.formatError(error, query, parameters));
  }

  public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.log(this.formatQuerySlow(time, query, parameters));
  }

  public logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.log(this.formatSchemaBuild(message));
  }

  public logMigration(message: string, queryRunner?: QueryRunner) {
    this.log(this.formatMigration(message));
  }

  /**
   * Formats the query to log.
   * 
   * @param query Query
   * @param parameters Query parameters
   * @returns Formatted query
   */
  private formatQuery(query: string, parameters?: any[]): string {
    const parametersFormat = parameters ? ` - Parameters: [${parameters.join(', ')}]` : '';
    return `Query: ${query}${parametersFormat}`;
  }

  /**
   * Formats the error to log.
   * 
   * @param error Error
   * @param query Query
   * @param parameters Query parameters
   * @returns Formatted error
   */
  private formatError(error: string, query: string, parameters?: any[]): string {
    return `Error: ${error} - ${this.formatQuery(query, parameters)}`;
  }

  /**
   * Formats the slow query to log.
   * 
   * @param query Query
   * @param parameters Query parameters
   * @returns Formatted query with time as milliseconds
   */
  private formatQuerySlow(time: number, query: string, parameters?: any[]): string {
    return this.formatQuery(`${query} (${time} ms)`, parameters);
  }

  /**
   * Formats the schema build message to log.
   * 
   * @param message Message
   * @returns Formatted message
   */
  private formatSchemaBuild(message: string): string {
    return `Schema build: ${message}`;
  }

  /**
   * Formats the migration message to log.
   * 
   * @param message Message
   * @returns Formatted message
   */
  private formatMigration(message: string): string {
    return `Migration: ${message}`;
  }
}
