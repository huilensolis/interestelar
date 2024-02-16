import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserType } from 'src/app/users/entities';
import { UserKey } from 'src/app/users/models';

export const GetUser = createParamDecorator(
  (param: UserKey | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserType;

    return param != null ? user[param] : user;
  },
);
