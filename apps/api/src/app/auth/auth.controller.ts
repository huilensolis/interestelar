import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { SignInDto, SignUpDto } from './dto';
import { CValidRoles } from './models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @Post('signUp')
  signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @Auth(CValidRoles.admin)
  @Get('/private')
  privateRoute() {
    return 'access to private route';
  }
}
