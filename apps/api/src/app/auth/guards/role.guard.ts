import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/app/users/entities';
import { BadCredentialsException } from 'src/common/exceptions';
import { ROLE_METADATA_NAME } from '../decorators/role.decorator';
import { TValidRoleArray } from '../models';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const validRoles = this.reflector.get<TValidRoleArray>(
      ROLE_METADATA_NAME,
      context.getHandler(),
    );

    if (validRoles?.[0] == null) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user: User = request.user;

    if (user == null) {
      throw new BadCredentialsException(
        'User does not exits, What are u trying?',
      );
    }

    const userHasAccess = validRoles.every((role) => user.roles.includes(role));

    if (!userHasAccess) {
      const intlInstance = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      });

      throw new BadCredentialsException(
        `You need ${validRoles.length > 1 ? 'these roles' : 'this role'} to access to this route: ${intlInstance.format(validRoles)}`,
      );
    }
    return userHasAccess;
  }
}
