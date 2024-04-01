import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateUUID } from 'src/common/utils';
import { FindOperator, ILike, Repository } from 'typeorm';
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

  public async getUser(searchParam: string) {
    const isSearchingByUUID = validateUUID(searchParam);

    const searchingBy: { key: string; query: string | FindOperator<string> } = {
      key: 'username',
      query: ILike(`%${searchParam}%`),
    };

    if (isSearchingByUUID) {
      searchingBy.key = 'id';
      searchingBy.query = searchParam;
    }

    const usersFound = await this.userRepository.find({
      where: { [searchingBy.key]: searchingBy.query },
    });

    return usersFound;
  }
}
