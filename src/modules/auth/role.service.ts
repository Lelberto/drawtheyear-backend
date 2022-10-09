import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Permission, Role } from '../../common/types/role.types';
import roleConfig, { RoleConfig } from '../config/role.config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RoleService {

  private readonly config: ConfigType<RoleConfig>;

  public constructor(@Inject(roleConfig.KEY) config: ConfigType<RoleConfig>) {
    this.config = config;
  }

  public checkPermissions(userOrRole: User | Role, ...requiredPermissions: Permission[]): boolean {
    const role = userOrRole instanceof User ? userOrRole.role : userOrRole;
    const permissions = this.getPermissions(role);
    return permissions.some(permission => requiredPermissions.includes(permission));
  }

  public getPermissions(role: Role): Permission[] {
    const roleConfig = this.config[role];
    const permissions = roleConfig.permissions as Permission[];
    roleConfig.extends.forEach(extendedRole => {
      permissions.push(...this.getPermissions(extendedRole));
    });
    return permissions;
  }
}
