import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

/**
 * Username to user pipe
 * 
 * Used to transform an username to the corresponding user.
 */
@Injectable()
export class UsernameToUserPipe implements PipeTransform<string, Promise<User>> {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(username: string): Promise<User> {
    return await this.userService.findByUsername(username);
  }
}
