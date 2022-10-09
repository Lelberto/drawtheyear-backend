import { SetMetadata } from '@nestjs/common';
import { Permission } from '../../types/role.types';

export const USE_PERMISSIONS_KEY = 'permissions';

export const UsePermissions = (...permissions: Permission[]) => SetMetadata(USE_PERMISSIONS_KEY, permissions);
