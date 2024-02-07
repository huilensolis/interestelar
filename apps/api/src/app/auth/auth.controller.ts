import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard())
  @Get('/private')
  privateRoute() {
    return 'access to private route';
  }
}
