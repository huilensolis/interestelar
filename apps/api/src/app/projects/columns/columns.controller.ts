import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Auth, GetUser } from 'src/app/auth/decorators';
import {
  ConflictResponse,
  ForbiddenResponse,
  NotFoundResponse,
  OkResponse,
} from 'src/app/common/models';
import { User } from 'src/app/users/entities';
import { Tag } from '../tags/entities/tag.entity';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Auth()
  @Post()
  @ApiCreatedResponse({
    type: Tag,
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
  })
  @ApiConflictResponse({
    type: ConflictResponse,
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
  })
  create(@Body() createColumnDto: CreateColumnDto, @GetUser() user: User) {
    return this.columnsService.create(createColumnDto, user);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateColumnDto: UpdateColumnDto,
    @GetUser() user: User,
  ) {
    return this.columnsService.update(id, updateColumnDto, user);
  }

  @Auth()
  @Delete(':id')
  @ApiDefaultResponse({
    type: OkResponse,
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
  })
  remove(@Param('id', ParseUUIDPipe) id: UUID, @GetUser() user: User) {
    return this.columnsService.remove(id, user);
  }
}
