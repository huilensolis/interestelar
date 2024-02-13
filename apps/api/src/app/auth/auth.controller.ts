import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthBadCredentialsResponse, ConflictResponse } from '../common/models';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { SignInDto, SignUpDto } from './dto';
import { CValidRoles, UserAuthSuccessResponse } from './models';

@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Sign in success',
    type: UserAuthSuccessResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Bad credentials',
    type: AuthBadCredentialsResponse,
  })
  @Post('signIn')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @ApiCreatedResponse({
    description: 'Sign up success',
    type: UserAuthSuccessResponse,
  })
  @ApiConflictResponse({
    description: 'Email or username already exits',
    type: ConflictResponse,
  })
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
