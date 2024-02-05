import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

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
}
