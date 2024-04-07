import { ProjectMembersService } from './modules/members'
import { ProjectCrudService } from './modules/project-crud'

export const ProjectService = {
  CRUD: ProjectCrudService,
  members: ProjectMembersService,
}
