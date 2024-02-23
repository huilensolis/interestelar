import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthBadCredentialsResponse, ConflictResponse } from '../common/models';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { SignInDto, SignUpDto } from './dto';
import { CValidRoles, UserAuthSuccessResponse } from './models';

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

    const webAppDomain = this.configService.get<string>('WEB_APP_DOMAIN');

    response.cookie('auth-cookie', access_token, {
      httpOnly: true,
      domain: webAppDomain,
    });

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

    const webAppDomain = this.configService.get<string>('WEB_APP_DOMAIN');

    response.cookie('auth-cookie', access_token, {
      httpOnly: true,
      domain: webAppDomain,
    });

    return user;
  }

  @Auth(CValidRoles.admin)
  @Get('/private')
  privateRoute() {
    return 'access to private route';
  }
}
