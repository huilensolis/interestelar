import { ApiProperty } from '@nestjs/swagger';

export class AuthBadCredentialsResponse {
  @ApiProperty({
    default: 401,
  })
  statusCode: 401;

  @ApiProperty({
    default: 'Bad credentials',
  })
  message: 'Bad credentials';
}

export class ConflictResponse {
  @ApiProperty({
    default: 409,
  })
  statusCode: 409;

  @ApiProperty({
    default: 'Conflict',
  })
  message: '';
}
