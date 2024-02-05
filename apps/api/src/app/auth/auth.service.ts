import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const user = this.userRepository.create(data);

    const queryResult = await this.userRepository.save(user);

    return queryResult;
  }

  signIn(data: SignInDto) {}
}
