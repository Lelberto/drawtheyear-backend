import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ControllerModule } from '../controllers/controller.module';
import { DatabaseModule } from '../database/database.module';
import { TaskModule } from '../tasks/task.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    TaskModule,
    DatabaseModule,
    ControllerModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
