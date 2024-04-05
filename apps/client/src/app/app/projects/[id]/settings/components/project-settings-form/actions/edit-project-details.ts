'use server'

import { ProjectsService } from '@/services/project'
import { getCookie } from '@/utils/cookie/get-cookie'
import { AxiosError } from 'axios'

export default async function editProjectDetails({
  projectId,
  name,
}: {
  projectId: string
  name: string
}): Promise<{ error: 'UNAUTHORIZED' | 'CONFLICT' | 'UNKNOWN' | null }> {
  try {
    const { cookie } = getCookie()

    if (!cookie) return { error: 'UNAUTHORIZED' }

    const { error } = await ProjectsService.editProjectDetails({
      projectId,
      name,
      cookie,
    })

    if (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) return { error: 'CONFLICT' }
      }

      throw new Error('')
    }

    return { error: null }
  } catch (error) {
    return { error: 'UNKNOWN' }
  }
}
