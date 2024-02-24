import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthCookieName } from 'src/app/common/models';
import { BadCredentialsException } from 'src/common/exceptions';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JwtPayload } from '../models/jwt.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('AUTH_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const data = request?.cookies[AuthCookieName];

          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    if (id == null) {
      throw new BadCredentialsException('Invalid token');
    }

    const user = await this.userRepository.findOneBy({ id });

    if (user == null || user.isActive === false)
      throw new BadCredentialsException('Invalid token');

    return user;
  }
}
