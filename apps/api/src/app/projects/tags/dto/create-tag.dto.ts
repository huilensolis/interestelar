import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { Color } from 'src/app/common/models';

export class CreateTagDto {
  @IsUUID()
  projectId: UUID;

  @IsString()
  tagName: string;

  @IsString()
  @IsEnum(Color)
  color: string;
}
