import { Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../user.service';

/**
 * Username to user ID pipe
 * 
 * Used to transform an username to the corresponding user ID.
 */
@Injectable()
export class UsernameToIdPipe implements PipeTransform<string, Promise<string>> {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(username: string): Promise<string> {
    return await this.userService.resolveId(username);
  }
}
