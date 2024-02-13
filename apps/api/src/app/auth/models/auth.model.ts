import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/app/users/entities';

export class UserAuthSuccessResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: User;
}
