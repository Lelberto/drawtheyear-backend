import { Module } from '@nestjs/common';
import { AttachmentModule } from '../attachments/attachment.module';
import { DayModule } from '../days/day.module';
import { UserEmotionController } from './user-emotion.controller';
import { EmotionController } from './emotion.controller';
import { EmotionModule } from '../emotions/emotion.module';
import { HateoasModule } from '../hateoas/hateoas.module';
import { UserModule } from '../users/user.module';
import { UserController } from './user.controller';
import { UserDayController } from './user-day.controller';
import { DayController } from './day.controller';
import { AttachmentController } from './attachment.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { StorageConfig } from '../config/storage';
import { StorageException } from '../storage/storage.exception';
import { AuthController } from './auth.controller';
import { AuthModule } from '../auth/auth.module';
import { UserDayAttachmentController } from './user-day-attachment.controller';
import { AppController } from './app.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const storageConfig = configService.get<StorageConfig>('storage');
        return {
          dest: storageConfig.tmpDir,
          limits: {
            fileSize: storageConfig.maxSize
          },
          fileFilter: (req, file, cb) => {
            if (storageConfig.allowedMineTypes.includes(file.mimetype.toLowerCase())) {
              cb(null, true);
            } else {
              cb(new StorageException(`Invalid file type: ${file.mimetype}`), false);
            }
          }
        }
      },
      inject: [ConfigService]
    }),
    HateoasModule,
    AuthModule,
    UserModule,
    EmotionModule,
    DayModule,
    AttachmentModule
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    UserEmotionController,
    UserDayController,
    UserDayAttachmentController,
    EmotionController,
    DayController,
    AttachmentController
  ]
})
export class ControllerModule {}
