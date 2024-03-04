import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(70)
  @MinLength(1)
  name: string;

  @IsString()
  emoji: string;
}
