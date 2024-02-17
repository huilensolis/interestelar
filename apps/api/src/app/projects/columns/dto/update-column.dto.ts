import { PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  @IsUUID()
  projectId: UUID;
}
