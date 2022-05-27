import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageConfig } from '../config/storage';

/**
 * Storage service
 */
@Injectable()
export abstract class StorageService {

  protected readonly config: StorageConfig;

  public constructor(configService: ConfigService) {
    this.config = configService.get('storage');
  }

  /**
   * Stores a path
   * 
   * @param srcPath Source path
   * @param options Store options
   * @returns Destination path
   */
  public abstract store(srcPath: string, options?: StoreOptions): Promise<string>;
}

/**
 * Store options
 */
export type StoreOptions = {
  transform?: (filename: string) => string;
  deleteSrcPath?: boolean;
}
