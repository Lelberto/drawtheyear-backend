import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

/**
 * Storage module
 */
@Module({
  providers: [StorageService]
})
export class StorageModule {}
