import { registerAs } from '@nestjs/config';
import { Permission, Role } from '../../common/types/role.types';

const config = registerAs('roles', () => ({
  [Role.USER]: {
    extends: [],
    permissions: []
  },
  [Role.ADMIN]: {
    extends: [Role.USER],
    permissions: [
      Permission.USER_UPDATE,
      Permission.EMOTION_CREATION,
      Permission.DAY_CREATION,
      Permission.DAY_UPDATE,
      Permission.DAY_DETAILS_BYPASS,
      Permission.DAY_ATTACHMENT_VIEW,
      Permission.DAY_ATTACHMENT_CREATE
    ]
  }
}));

export type RoleConfig = typeof config;
export default config;
