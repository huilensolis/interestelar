import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { postgresErrorHandler } from 'src/app/common/utils/handle-db-exceptions.model';
import { User } from 'src/app/users/entities';
import { Repository } from 'typeorm';
import { Project } from '../base/entities';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ProjectColumn } from './entities';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ProjectColumn)
    private projectColumnRepository: Repository<ProjectColumn>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createColumnDto: CreateColumnDto, user: User) {
    const { projectId, ...column } = createColumnDto;

    await this.verifyProjectOwner(projectId, user);

    try {
      const columnSaved = await this.projectColumnRepository.save({
        ...column,
        project: { id: projectId, user: { id: user.id } },
      });

      return columnSaved;
    } catch (error) {
      postgresErrorHandler(error);
    }
  }

  async update(columnId: UUID, updateColumnDto: UpdateColumnDto, user: User) {
    const { projectId, ...column } = updateColumnDto;

    await this.verifyProjectOwner(projectId, user);

    const columnPreloaded = await this.projectColumnRepository.preload({
      id: columnId,
    });

    if (columnPreloaded == null) {
      throw new NotFoundException();
    }

    const columnToSave: ProjectColumn = {
      ...columnPreloaded,
      ...column,
    };

    const columnSaved = await this.projectColumnRepository.save(columnToSave);

    return columnSaved;
  }

  async remove(id: UUID, user: User) {
    const { affected } = await this.projectColumnRepository.delete({
      id,
      project: {
        user: { id: user.id },
      },
    });

    if (affected === 0) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    return 'Tag removed';
  }

  async verifyProjectOwner(projectId: UUID, user: User) {
    const projectFound = await this.projectRepository.findOneBy({
      id: projectId,
      user: {
        id: user.id,
      },
    });

    if (projectFound == null) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    if (projectFound?.tags?.length >= 10) {
      throw new ForbiddenException(
        'Yo have reached the limit of tags for a project',
      );
    }
  }
}
