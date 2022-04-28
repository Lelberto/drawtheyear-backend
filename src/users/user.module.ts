import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

/**
 * User module
 */
@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
