import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../guards';
import { TValidRoleArray } from '../models';
import { RoleProtected } from './role.decorator';

export function Auth(...validRoles: TValidRoleArray) {
  return applyDecorators(
    RoleProtected(validRoles),
    UseGuards(AuthGuard(), RoleGuard),
  );
}
