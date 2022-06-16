import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { StorageConfig } from '../config/storage';
import { LocalStorageService } from './providers/local-storage.provider';
import { S3StorageService } from './providers/s3-storage.provider';
import { StorageProvider } from './providers/storage.provider';

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
  public static register(options: StorageModuleOptions = storageModuleOptionsDefault): DynamicModule {
    return {
      module: StorageModule,
      imports: [ScheduleModule.forRoot()],
      providers: [
        {
          provide: StorageProvider,
          useClass: StorageModule.getStorageServiceType(options.type)
        }
      ],
      exports: [StorageProvider]
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
      case 's3': return S3StorageService;
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

/** Storage module options default values */
const storageModuleOptionsDefault: StorageModuleOptions = {
  type: 'local'
}
