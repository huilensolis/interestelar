import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { UUID } from 'crypto';

export class CreateColumnDto {
  @IsUUID()
  projectId: UUID;

  @IsString()
  @MinLength(1)
  @MaxLength(14)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(14)
  emoji: string;
}
