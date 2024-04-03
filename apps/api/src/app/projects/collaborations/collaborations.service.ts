import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { User } from 'src/app/users/entities';
import { In, Repository } from 'typeorm';
import { Project } from '../base/entities';
import { SendInvitationDTO } from './dto/send-invitation.dto';
import { Collaboration } from './entities/collaboration.entity';

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(Collaboration)
    private readonly collaborationRepository: Repository<Collaboration>,
  ) {}

  async getInvitations(user: User) {
    const collaborations = await this.collaborationRepository.find({
      where: {
        collaborators: { id: user.id },
        status: 'pending',
      },
      relations: ['projects'],
    });

    let projectsInvitations: Project[] = [];

    collaborations.forEach((collaboration) => {
      projectsInvitations = [...projectsInvitations, ...collaboration.projects];
    });

    return projectsInvitations;
  }

  async sendInvitation(
    { projectToInviteId, userReceptorId }: SendInvitationDTO,
    user: User,
  ) {
    const userCollaboration = await this.collaborationRepository.findOne({
      where: {
        collaborators: { id: user.id },
        projects: { id: projectToInviteId },
        role: In(['moderator', 'owner']),
      },
    });

    if (userCollaboration == null) {
      throw new NotFoundException(
        `Project with id ${projectToInviteId} not found`,
      );
    }

    const isValidInvitation = await this.collaborationRepository.findOne({
      where: {
        collaborators: { id: userReceptorId },
        projects: { id: projectToInviteId },
        status: In(['pending', 'active']),
      },
    });

    if (isValidInvitation != null) {
      throw new ConflictException(
        `This user is already ${isValidInvitation.status}`,
      );
    }

    const userInvitationCollaboration = this.collaborationRepository.create({
      collaborators: [{ id: userReceptorId }],
      projects: [{ id: projectToInviteId }],
      role: 'member',
      status: 'pending',
    });

    const userInvitationCollaborationSaved =
      await this.collaborationRepository.save(userInvitationCollaboration);

    return userInvitationCollaborationSaved;
  }

  async acceptInvitation(user: User, projectToJoinId: UUID) {
    const collaborationFound = await this.collaborationRepository.findOne({
      where: {
        collaborators: { id: user.id },
        projects: { id: projectToJoinId },
        status: 'pending',
      },
    });

    if (collaborationFound == null) {
      throw new NotFoundException();
    }

    collaborationFound.status = 'active';

    return await this.collaborationRepository.save(collaborationFound);
  }
}
