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

export class UnauthorizedResponse {
  @ApiProperty({
    default: 401,
  })
  statusCode: 401;

  @ApiProperty({
    default: 'Unauthorized',
  })
  message: 'Unauthorized';
}

export class ConflictResponse {
  @ApiProperty({
    default: 409,
  })
  statusCode: 409;

  @ApiProperty({
    default: 'Conflict',
  })
  message: 'Conflict';
}

export class NotFoundResponse {
  @ApiProperty({
    default: 404,
  })
  statusCode: 404;

  @ApiProperty({
    default: 'Not found',
  })
  message: 'Not found';
}

export class OkResponse {
  @ApiProperty({
    default: 200,
  })
  statusCode: 200;

  @ApiProperty({
    default: 'OK',
  })
  message: 'OK';
}

export class ForbiddenResponse {
  @ApiProperty({
    default: 403,
  })
  statusCode: 403;

  @ApiProperty({
    default: 'Forbidden',
  })
  message: 'Forbidden';
}
