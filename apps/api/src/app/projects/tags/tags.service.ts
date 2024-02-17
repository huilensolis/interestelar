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
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTagDto: CreateTagDto, user: User) {
    const { projectId, ...tag } = createTagDto;

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

    try {
      const tagSaved = await this.tagRepository.save({
        ...tag,
        project: { id: projectId, user: { id: user.id } },
      });

      return tagSaved;
    } catch (error) {
      postgresErrorHandler(error);
    }
  }

  async remove(id: UUID, user: User) {
    const { affected } = await this.tagRepository.delete({
      id,
      project: {
        user: { id: user.id },
      },
    });

    if (affected === 0) {
      throw new NotFoundException(
        `Tag with id ${id} roject to delete not found`,
      );
    }

    return 'Tag removed';
  }
}
