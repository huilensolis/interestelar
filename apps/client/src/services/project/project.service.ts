import { ApiRouting } from '@/models/routes/api/api.model'
import { type Project } from '@/types/project'
import axios from 'axios'

type TCreateProjectResponse = {
  name: Project['name']
  emoji: Project['emoji']
  id: Project['id']
}

export class ProjectsService {
  static async create({ name }: { name: string }): Promise<{
    error: string | null
    data: { project: TCreateProjectResponse } | null
  }> {
    try {
      const { status, data } = await axios.post<TCreateProjectResponse | null>(
        ApiRouting.project.create,
        {
          emoji: '🎃',
          name,
        }
      )

      if (status !== 201 || !data) throw new Error('Error creating project')

      return { error: null, data: { project: data } }
    } catch (error) {
      return { error: 'Error creating project', data: null }
    }
  }

  static async delete(projectId: string): Promise<{ error: string | null }> {
    try {
      const { status } = await axios.delete(
        ApiRouting.project.delete(projectId)
      )

      if (status !== 200) throw new Error('error deleting project')

      return { error: null }
    } catch (error) {
      return { error: 'error deleting project' }
    }
  }

  static async getById(
    projectId: string
  ): Promise<{ data: { project: Project } | null; error: string | null }> {
    try {
      const { data, status } = await axios.get<Project | null>(
        ApiRouting.project.getById(projectId),
        { withCredentials: true }
      )

      if (!data || status !== 200) throw new Error('Error getting project')

      return { data: { project: data }, error: null }
    } catch (error) {
      return { data: null, error: 'error getting project by id' }
    }
  }

  static async getUserProjectList(): Promise<{
    data: { projects: Project[] } | null
    error: string | null
  }> {
    try {
      const { data, status } = await axios.get<Project[] | null>(
        ApiRouting.project.getUserProjectList,
        { headers: { credentials: 'include' } }
      )

      if (!data || status !== 200)
        throw new Error('Error getting user projects')

      return { data: { projects: data }, error: null }
    } catch (error) {
      return { data: null, error: 'error getting user projects' }
    }
  }
}
