/** Logging configuration */

export type LoggingConfig = {
  dateFormat: string;
  accessFormat: string;
  dir: string;
  files: {
    application: string;
    access: string;
    database: string;
  };
}

export default (): { logging: LoggingConfig } => ({
  logging: {
    dateFormat: process.env.LOGGING_DATE_FORMAT,
    accessFormat: process.env.LOGGING_ACCESS_FORMAT,
    dir: process.env.LOGGING_DIR,
    files: {
      application: process.env.LOGGING_FILE_APPLICATION,
      access: process.env.LOGGING_FILE_ACCESS,
      database: process.env.LOGGING_FILE_DATABASE
    }
  }
});
