import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { postgresErrorHandler } from 'src/app/common/utils/handle-db-exceptions.model';
import { User } from 'src/app/users/entities';
import { Repository } from 'typeorm';
import { Collaboration } from '../collaborations/entities/collaboration.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Collaboration)
    private readonly collaborationRepository: Repository<Collaboration>,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      const newProject = this.projectRepository.create({
        ...createProjectDto,
        user,
      });

      const projectData = await this.projectRepository.save(newProject);

      const newCollaboration = this.collaborationRepository.create({
        collaborators: [user],
        projects: [projectData],
        role: 'owner',
        status: 'active',
      });

      await this.collaborationRepository.save(newCollaboration);

      return this.formatProjectData(projectData);
    } catch (error) {
      postgresErrorHandler(error);
    }
  }

  async getAllUserProjects(userId: UUID) {
    const collaborationFound = await this.collaborationRepository.find({
      where: {
        collaborators: { id: userId },
        status: 'active',
      },
      relations: ['projects'],
    });

    let projectsFound: Project[] = [];

    if (collaborationFound?.[0] != null) {
      collaborationFound.forEach((collaboration) => {
        projectsFound = [...projectsFound, ...collaboration.projects];
      });
    }

    return projectsFound;
  }

  async findOne(projectId: UUID, user: User) {
    const collaborationFound = await this.collaborationRepository.findOne({
      where: {
        projects: { id: projectId },
        collaborators: { id: user.id },
      },
      relations: ['projects'],
    });

    if (collaborationFound?.projects?.[0] == null) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const projectFound = collaborationFound.projects[0];

    return projectFound;
  }

  async update(
    projectId: UUID,
    updateProjectDto: UpdateProjectDto,
    user: User,
  ) {
    const collaborationFound = await this.collaborationRepository.findOne({
      where: {
        projects: { id: projectId },
        collaborators: { id: user.id },
      },
      relations: ['projects'],
    });

    const projectToUpdate = collaborationFound?.projects?.[0];
    if (projectToUpdate == null) {
      throw new NotFoundException(`Project ${projectId} not found`);
    }

    if (
      collaborationFound?.role === 'member' ||
      collaborationFound?.status !== 'active'
    ) {
      throw new UnauthorizedException();
    }

    const projectUpdated = {
      ...projectToUpdate,
      ...updateProjectDto,
    };

    try {
      const productSaved = await this.projectRepository.save(projectUpdated);

      return this.formatProjectData(productSaved);
    } catch (error) {
      postgresErrorHandler(error);
    }
  }

  async remove(projectId: UUID, user: User) {
    const collaborationFound = await this.collaborationRepository.findOne({
      where: {
        projects: { id: projectId },
        collaborators: { id: user.id },
      },
    });

    if (collaborationFound == null) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    if (
      collaborationFound?.role !== 'owner' ||
      collaborationFound?.status !== 'active'
    ) {
      throw new UnauthorizedException(
        'You need to be the the project owner and be an active user',
      );
    }

    const { affected } = await this.projectRepository.delete({
      id: projectId,
      user,
    });

    if (affected === 0) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    return `Project ${projectId} removed`;
  }

  private formatProjectData(project: Project) {
    const publicProjectData: Partial<Project> = project;

    delete publicProjectData.user;

    return publicProjectData;
  }
}
