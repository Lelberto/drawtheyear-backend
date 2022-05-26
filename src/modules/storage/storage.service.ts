import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageConfig } from '../config/storage';

/**
 * Storage service
 */
@Injectable()
export class StorageService {

  private readonly config: StorageConfig;

  public constructor(configService: ConfigService) {
    this.config = configService.get('storage');
  }
}
