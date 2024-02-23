import {
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';
import { Color } from 'src/app/common/models';

export class CreateTagDto {
  @IsUUID()
  projectId: UUID;

  @IsString()
  @MinLength(1)
  @MaxLength(14)
  tagName: string;

  @IsString()
  @IsEnum(Color)
  color: string;
}
