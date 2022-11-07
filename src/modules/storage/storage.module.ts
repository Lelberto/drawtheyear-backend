import { DynamicModule, Module } from '@nestjs/common';
import { LocalStorageProvider } from './providers/local/local.storage-provider';
import { S3StorageProvider } from './providers/s3/s3.storage-provider';
import { StorageProvider } from './providers/storage-provider';
import { ConfigurableModuleClass, OPTIONS_TYPE } from './storage.module-definition';
import { StorageService } from './storage.service';

@Module({})
export class StorageModule extends ConfigurableModuleClass {

  public static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      ...super.register(options),
      module: StorageModule,
      providers: [
        StorageService,
        {
          provide: StorageProvider,
          useClass: this.getStorageProvider(options.type)
        }
      ],
      exports: [StorageService]
    };
  }

  private static getStorageProvider(type: 'local' | 's3') {
    switch (type) {
      default:
      case 'local': return LocalStorageProvider;
      case 's3': return S3StorageProvider;
    }
  }
}
