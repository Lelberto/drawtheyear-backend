import { BadRequestException } from '@nestjs/common';

/**
 * Storage exception
 */
export class StorageException extends BadRequestException {

  public constructor(message: string) {
    super(message);
  }
}
