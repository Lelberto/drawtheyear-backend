import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class ResolveUserIdPipe implements PipeTransform<string, Promise<User>> {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(value: string, metadata: ArgumentMetadata): Promise<User> {
    return await this.userService.findById(value);
  }
}
