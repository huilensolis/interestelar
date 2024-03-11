'use server'

import { ProjectsService } from '@/services/project'
import { getCookie } from '@/utils/cookie/get-cookie'
import { revalidatePath } from 'next/cache'

export default async function editProjectDetails({
  projectId,
  name,
}: {
  projectId: string
  name: string
}) {
  try {
    const { cookie } = getCookie()

    if (!cookie) return

    const { error } = await ProjectsService.editProjectDetails({
      projectId,
      name,
      cookie,
    })

    if (error) throw new Error('error on request')

    revalidatePath('/', 'layout')
  } catch (error) {
    throw new Error('error editing proejct details')
  }
}
