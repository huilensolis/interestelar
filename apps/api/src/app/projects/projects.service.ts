import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { postgresErrorHandler } from '../common/utils/handle-db-exceptions.model';
import { User } from '../users/entities';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      const newProject = this.projectRepository.create({
        ...createProjectDto,
        user,
      });

      const projectData = await this.projectRepository.save(newProject);

      return this.formatProjectData(projectData);
    } catch (error) {
      postgresErrorHandler(error);
    }
  }

  async getAllUserProjects(userId: UUID) {
    const userProjects = await this.projectRepository.findBy({
      user: { id: userId },
    });

    if (userProjects?.[0] == null) {
      throw new NotFoundException();
    }

    return userProjects;
  }

  async findOne(id: UUID, user: User) {
    const projectFound = await this.projectRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    console.log({ projectFound });
    if (projectFound == null) {
      throw new NotFoundException('Product not found');
    }

    return projectFound;
  }

  async update(id: UUID, updateProjectDto: UpdateProjectDto, user: User) {
    let projectFound = await this.projectRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (projectFound == null) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    projectFound = {
      ...projectFound,
      ...updateProjectDto,
    };

    try {
      const productSaved = await this.projectRepository.save(projectFound);

      return this.formatProjectData(productSaved);
    } catch (error) {
      postgresErrorHandler(error);
    }
  }

  async remove(id: UUID, user: User) {
    const { affected } = await this.projectRepository.delete({ id, user });

    if (affected === 0) {
      throw new NotFoundException('Project not found');
    }

    return `Project ${id} removed`;
  }

  private formatProjectData(project: Project) {
    const publicProjectData: Partial<Project> = project;

    delete publicProjectData.user;

    return publicProjectData;
  }
}
