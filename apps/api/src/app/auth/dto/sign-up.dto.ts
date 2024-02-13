import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  /**
   * User email
   * @example 'correo@gmail.com'
   */
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  /**
   * User username
   * @example 'HuilenSolis23'
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'The username should not contain symbols or operators.',
  })
  username: string;

  /**
   * User password
   * @example 'Password123123'
   */
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
