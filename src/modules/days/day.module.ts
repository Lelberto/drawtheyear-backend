import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentModule } from '../attachments/attachment.module';
import { AttachmentRepository } from '../attachments/attachment.repository';
import { AttachmentService } from '../attachments/attachment.service';
import { StorageConfig } from '../config/storage';
import { EmotionModule } from '../emotions/emotion.module';
import { EmotionRepository } from '../emotions/emotion.repository';
import { HateoasModule } from '../hateoas/hateoas.module';
import { StorageException } from '../storage/storage.exception';
import { StorageModule } from '../storage/storage.module';
import { UserModule } from '../users/user.module';
import { UserRepository } from '../users/user.repository';
import { DayByUserController } from './day-by-user.controller';
import { DayController } from './day.controller';
import { Day } from './day.entity';
import { DayRepository } from './day.repository';
import { DayService } from './day.service';

/**
 * Day module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Day, DayRepository, UserRepository, EmotionRepository, AttachmentRepository]),
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<StorageConfig>('storage');
        return {
          dest: config.local.dest,
          limits: {
            fileSize: config.maxSize
          },
          fileFilter: (req, file, cb) => {
            if (config.allowedMineTypes.includes(file.mimetype.toLowerCase())) {
              cb(null, true);
            } else {
              cb(new StorageException(`Invalid file type: ${file.mimetype}`), false);
            }
          }
        }
      },
      inject: [ConfigService]
    }),
    StorageModule,
    UserModule,
    EmotionModule,
    AttachmentModule,
    HateoasModule
  ],
  providers: [DayService, AttachmentService],
  controllers: [DayController, DayByUserController]
})
export class DayModule {}
