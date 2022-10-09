import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { USE_PERMISSIONS_KEY } from '../../../../common/decorators/auth/use-permissions.decorator';
import { USE_ROLES_KEY } from '../../../../common/decorators/auth/use-roles.decorator';
import { Permission, Role } from '../../../../common/types/role.types';
import { extractAuthUserFromRequest } from '../../../../common/utils/utils';
import { RoleService } from '../../role.service';

@Injectable()
export class RoleGuard implements CanActivate {

  private readonly reflector: Reflector;
  private readonly roleService: RoleService;

  public constructor(reflector: Reflector, roleService: RoleService) {
    this.reflector = reflector;
    this.roleService = roleService;
  }

  public canActivate(context: ExecutionContext): boolean {
    const authUser = extractAuthUserFromRequest(context.switchToHttp().getRequest<Request>());
    const contextHandler = context.getHandler();
    const contextClass = context.getClass();
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(USE_ROLES_KEY, [contextHandler, contextClass]);
    if (requiredRoles) {
      return authUser && requiredRoles.includes(authUser.role);
    }
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(USE_PERMISSIONS_KEY, [contextHandler, contextClass]);
    if (requiredPermissions) {
      return authUser && this.roleService.checkPermissions(authUser, ...requiredPermissions);
    }
    return true;
  }
}
