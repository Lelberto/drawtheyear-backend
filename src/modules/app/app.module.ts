import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ControllerModule } from '../controllers/controller.module';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';
import { TaskModule } from '../tasks/task.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    TaskModule,
    DatabaseModule,
    StorageModule.register({ isGlobal: true, type: 'local' }), // TODO Make registerAsync
    ControllerModule
  ],
  providers: [AppService],
})
export class AppModule {}
