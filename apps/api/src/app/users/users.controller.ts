import { Controller, Get, Param } from '@nestjs/common';
import { IsEmailPipe } from './pipes';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('/check/username/:value')
  checkUsername(@Param('value') username: string) {
    return this.userService.checkUserData('username', username);
  }

  @Get('/check/email/:value')
  checkEmail(@Param('value', IsEmailPipe) email: string) {
    return this.userService.checkUserData('email', email);
  }
}
