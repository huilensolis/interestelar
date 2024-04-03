import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { Auth, GetUser } from 'src/app/auth/decorators';
import { User } from 'src/app/users/entities';
import { CollaborationsService } from './collaborations.service';
import { SendInvitationDTO } from './dto/send-invitation.dto';

@Controller()
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @Get('invitations')
  @Auth()
  findAll(@GetUser() user: User) {
    return this.collaborationsService.getInvitations(user);
  }

  @Post('invitations/send')
  @Auth()
  sendInvitation(
    @GetUser() user: User,
    @Body() sendInvitationDTO: SendInvitationDTO,
  ) {
    return this.collaborationsService.sendInvitation(sendInvitationDTO, user);
  }

  @Get('invitations/join/:projectToJoinId')
  @Auth()
  acceptInvitation(
    @Param('projectToJoinId', ParseUUIDPipe) invitationId: UUID,
    @GetUser() user: User,
  ) {
    return this.collaborationsService.acceptInvitation(user, invitationId);
  }
}
