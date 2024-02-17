import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';

@Controller()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

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
  create(@Body() createTagDto: CreateTagDto, @GetUser() user: User) {
    return this.tagsService.create(createTagDto, user);
  }

  @Auth()
  @Delete(':id')
  @ApiDefaultResponse({
    type: OkResponse,
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
  })
  remove(@Param('id') id: UUID, @GetUser() user: User) {
    return this.tagsService.remove(id, user);
  }
}
