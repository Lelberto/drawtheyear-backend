import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

/**
 * ID to user pipe
 * 
 * Used to transform an user ID to the corresponding user.
 */
@Injectable()
export class IdToUserPipe implements PipeTransform<string, Promise<User>> {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(id: string): Promise<User> {
    return await this.userService.findById(id);
  }
}
