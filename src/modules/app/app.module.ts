import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { EmotionModule } from '../emotions/emotion.module';
import { UserModule } from '../users/user.module';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule, EmotionModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
