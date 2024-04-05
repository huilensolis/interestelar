import { ProjectsService } from '@/services/project'
import { ProjectsDropDown } from '../../projects-drop-down'
import { getCookie } from '@/utils/cookie/get-cookie'

export async function ProjectDropDown({ projectId }: { projectId: string }) {
  const { cookie } = getCookie()

  if (!cookie) return <></>

  const { data: currentProjectData } = await ProjectsService.getById(
    projectId,
    cookie
  )

  const { data: projectListData } =
    await ProjectsService.getUserProjectList(cookie)

  return (
    <ProjectsDropDown
      projectList={projectListData?.projects ?? []}
      currentProject={currentProjectData?.project ?? null}
    />
  )
}
