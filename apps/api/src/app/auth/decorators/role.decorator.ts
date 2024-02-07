import { SetMetadata } from '@nestjs/common';
import { TValidRoleArray } from '../models';

export const ROLE_METADATA_NAME = 'roles';

export const RoleProtected = (validRoles: TValidRoleArray) => {
  return SetMetadata(ROLE_METADATA_NAME, validRoles);
};
