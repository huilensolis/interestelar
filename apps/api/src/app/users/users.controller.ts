import { Controller, Get, Param } from '@nestjs/common';
import { IsEmailPipe } from './pipes';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('/check/username/:id')
  checkUsername(@Param('id') username: string) {
    return this.userService.checkUserData('username', username);
  }

  @Get('/check/email/:id')
  checkEmail(@Param('id', IsEmailPipe) email: string) {
    return this.userService.checkUserData('email', email);
  }
}
