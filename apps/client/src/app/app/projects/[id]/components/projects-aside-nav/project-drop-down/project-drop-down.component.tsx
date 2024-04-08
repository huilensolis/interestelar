import { ProjectsDropDown } from '@/components/features/project-drop-down'
import { ProjectService } from '@/services/project'
import { getCookie } from '@/utils/cookie/get-cookie'

export async function ProjectDropDown({ projectId }: { projectId: string }) {
  const { cookie } = getCookie()

  if (!cookie) return <></>

  const { data: currentProjectData } = await ProjectService.CRUD.getById(
    projectId,
    cookie
  )

  const { data: projectListData } =
    await ProjectService.CRUD.getUserProjectList(cookie)

  return (
    <ProjectsDropDown
      projectList={projectListData?.projects ?? []}
      currentProject={currentProjectData?.project ?? null}
    />
  )
}
