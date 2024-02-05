import { IsEmail, IsString, Min } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Min(4)
  password: string;
}
