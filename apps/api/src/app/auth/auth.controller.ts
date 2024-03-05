import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  AuthBadCredentialsResponse,
  ConflictResponse,
  OkResponse,
  UnauthorizedResponse,
} from '../common/models';
import { User } from '../users/entities';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { Auth } from './decorators/auth.decorator';
import { SignInDto, SignUpDto } from './dto';
import { CValidRoles, UserAuthSuccessResponse } from './models';
import { adaptCookie, deleteCookie } from './utils/';

@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiCreatedResponse({
    description: 'Sign in success',
    type: UserAuthSuccessResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Bad credentials',
    type: AuthBadCredentialsResponse,
  })
  @Post('sign-in')
  async signIn(
    @Body() data: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, access_token } = await this.authService.signIn(data);

    adaptCookie(access_token, response);

    return { user };
  }

  @ApiCreatedResponse({
    description: 'Sign up success',
    type: UserAuthSuccessResponse,
  })
  @ApiConflictResponse({
    description: 'Email or username already exits',
    type: ConflictResponse,
  })
  @Post('sign-up')
  async signUp(
    @Body() data: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.signUp(data);

    if (userData == null) return;

    const { access_token, user } = userData;

    adaptCookie(access_token, response);

    return { user };
  }

  @ApiDefaultResponse({
    description: 'Sign out success',
    type: OkResponse,
  })
  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response) {
    deleteCookie(response);

    return 'OK';
  }

  @Auth()
  @ApiDefaultResponse({
    description: 'Valid session',
    type: OkResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid session',
    type: UnauthorizedResponse,
  })
  @Get('check-session')
  checkAuth() {
    return 'OK';
  }

  @Auth()
  @Get('/user')
  @ApiDefaultResponse({
    description: 'User data',
    type: UserAuthSuccessResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid session',
    type: UnauthorizedResponse,
  })
  getUserAuth(@GetUser() user: User) {
    return user;
  }

  @Auth(CValidRoles.admin)
  @Get('/private')
  privateRoute() {
    return 'access to private route';
  }
}
