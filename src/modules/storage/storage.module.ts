import { DynamicModule, Module } from '@nestjs/common';
import { StorageConfig } from '../config/storage';
import { LocalStorageService } from './local-storage.service';
import { S3StorageService } from './s3-storage.service';
import { StorageService } from './storage.service';

/**
 * Storage module
 */
@Module({})
export class StorageModule {

  /**
   * Registers the module
   * 
   * @param options Options
   * @returns Storage module
   */
  public static register(options: StorageModuleOptions = { type: 'local' }): DynamicModule {
    return {
      module: StorageModule,
      providers: [
        {
          provide: StorageService,
          useClass: StorageModule.getStorageServiceType(options.type)
        }
      ],
      exports: [StorageService]
    }
  }

  public static async registerAsync() {
    // TODO Implement async registration
  }

  /**
   * Resolves the storage service instance to use
   * 
   * @param type Storage type
   * @returns Resolved instance of storage service to use
   * @throws Error if the storage type is not supported
   */
  private static getStorageServiceType(type: StorageModuleOptions['type']) {
    switch (type) {
      case 'local': return LocalStorageService;
      case 's3': return S3StorageService; // TODO Implement S3 storage
      default: throw new Error(`Unknown storage type: ${type}`);
    }
  }
}

/**
 * Storage module options
 */
export type StorageModuleOptions = {
  type: StorageConfig['type'];
};
