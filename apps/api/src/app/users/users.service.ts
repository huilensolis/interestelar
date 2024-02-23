import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { UserKey } from './models';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async checkUserData(userKey: UserKey, value: string) {
    const userFound = await this.userRepository.findOneBy({ [userKey]: value });

    if (userFound != null) {
      throw new ConflictException();
    }

    return 'OK';
  }
}
