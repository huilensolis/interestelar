import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadCredentialsException } from 'src/common/exceptions';
import { throwError } from 'src/common/utils';
import { Repository } from 'typeorm';
import { SignInDto, SignUpDto } from './dto';
import { User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(data: SignUpDto) {
    try {
      const user = this.userRepository.create(data);

      const queryResult = await this.userRepository.save(user);

      return queryResult;
    } catch (error) {
      throwError(error);
    }
  }

  async signIn(data: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
      select: { id: true, password: true },
    });

    const isAInvalidUser = user == null;
    if (isAInvalidUser) {
      throw new BadCredentialsException();
    }

    const isAInvalidPassword = user.password !== data.password;
    if (isAInvalidPassword) {
      throw new BadCredentialsException();
    }

    return user;
  }
}
