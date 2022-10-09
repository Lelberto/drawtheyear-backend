import { SetMetadata } from '@nestjs/common';
import { Role } from '../../types/role.types';

export const USE_ROLES_KEY = 'roles';

export const UseRoles = (...roles: Role[]) => SetMetadata(USE_ROLES_KEY, roles);
