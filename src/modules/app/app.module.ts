import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../users/user.module';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
