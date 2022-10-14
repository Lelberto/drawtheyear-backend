import { Injectable } from '@nestjs/common';
import { Role } from '../../common/types/role.types';
import { UserService } from '../users/user.service';
import { Command, CommandOption, ExitCode } from './command';

@Injectable()
export class ChangeRoleCommand extends Command {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    super('change-role');
    this.userService = userService;
  }

  public async execute(args: string[], options: CommandOption[]): Promise<ExitCode> {
    const userId = args[0];
    if (!userId) {
      throw new Error('No user ID provided');
    }
    const role = args[1];
    if (!role) {
      throw new Error('No role provided');
    }
    const user = await this.userService.findById(userId);
    await this.userService.changeRole(user, { role: role as Role });
    console.log(`User ${user.username} has been granted to role ${role}`);
    return ExitCode.OK;
  }
}
