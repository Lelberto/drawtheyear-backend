import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Storage exception
 */
export class StorageException extends HttpException {

  public constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
