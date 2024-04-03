import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class SendInvitationDTO {
  @IsUUID()
  userReceptorId: UUID;

  @IsUUID()
  projectToInviteId: UUID;
}
