import { ApiRouting } from '@/models/routes/api/api.model'
import axios from 'axios'

export class ProjectMembersService {
  static async invite(
    projectId: string,
    userReceptorId: string
  ): Promise<{ error: 'UNKNOWN' | null }> {
    try {
      const { status } = await axios.post(ApiRouting.projectMembers.invite(), {
        userReceptorId,
        projectToInviteId: projectId,
      })

      console.log({ status })

      return { error: null }
    } catch (error) {
      return { error: 'UNKNOWN' }
    }
  }

  static async getUserInvitationList(): Promise<{
    data: any | null
    error: 'UNKNOWN' | null
  }> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, status } = await axios.get(
        ApiRouting.projectMembers.getUserInvitationList()
      )

      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'UNKNOWN' }
    }
  }

  static async acceptInvitation({
    projectId,
  }: {
    projectId: string
  }): Promise<{ error: 'UNKNOWN' | null }> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status } = await axios.get(
        ApiRouting.projectMembers.joinProjectByInvitation(projectId)
      )
      return { error: null }
    } catch (error) {
      return { error: 'UNKNOWN' }
    }
  }
}
