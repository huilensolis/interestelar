import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BadCredentialsException } from 'src/common/exceptions';
import { throwError } from 'src/common/utils';
import { Repository } from 'typeorm';
import { User } from '../users/entities';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    try {
      const user = this.userRepository.create(data);

      const userInDB = await this.userRepository.save(user);

      return await this.getUserAndAuth(userInDB);
    } catch (error) {
      throwError(error);
    }
  }

  async signIn(data: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        roles: true,
        password: true,
      },
    });

    const isAInvalidUser = user == null;
    if (isAInvalidUser) {
      throw new BadCredentialsException();
    }

    const isAInvalidPassword = user.password !== data.password;
    if (isAInvalidPassword) {
      throw new BadCredentialsException();
    }

    return await this.getUserAndAuth(user);
  }

  private async getUserAndAuth(user: User) {
    const visibleUserData: Partial<User> = {
      ...user,
    };

    delete visibleUserData.password;

    const access_token = await this.jwtService.signAsync(visibleUserData);

    return { user: visibleUserData, access_token };
  }
}
