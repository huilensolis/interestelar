import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Auth, GetUser } from 'src/app/auth/decorators';
import { User } from 'src/app/users/entities';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Auth()
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @GetUser() user: User) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Auth()
  @Get('/user/')
  getAllUserProjects(@GetUser('id') userId: UUID) {
    return this.projectsService.getAllUserProjects(userId);
  }

  @Auth()
  @Get('/user/:id')
  getOneProject(@Param('id', ParseUUIDPipe) id: UUID, @GetUser() user: User) {
    return this.projectsService.findOne(id, user);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ) {
    return this.projectsService.update(id, updateProjectDto, user);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID, @GetUser() user: User) {
    return this.projectsService.remove(id, user);
  }
}
