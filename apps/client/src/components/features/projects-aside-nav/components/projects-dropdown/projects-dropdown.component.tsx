'use client'

import { DropDown } from '@/components/features/drop-down'
import { Icon } from '@/components/ui/icon'
import { ChevronsUpDown, GanttChart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ClientRouting } from '@/models/routes/client'
import { ProjectsService } from '@/services/project'
import { type Project } from '@/types/project'
import { ProjectList } from './projects-list'

export function ProjectsDropDown() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [isFetching, setIsfetching] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)

  const pathName = usePathname()

  useEffect(() => {
    const currentProjectId = pathName.split(
      ClientRouting.app().projects().project('')
    )[1]

    if (currentProjectId) {
      setProjectId(currentProjectId)
    }
  }, [pathName])

  useEffect(() => {
    async function getProjectById(projectId: string) {
      try {
        setIsfetching(true)
        const { data, error } = await ProjectsService.getById(projectId)
        if (!data || error) throw new Error('error getting current project')

        const { project } = data

        if (!project) throw new Error('project not found')

        setCurrentProject(project)
      } catch (error) {
        setError(true)
      } finally {
        setIsfetching(false)
      }
    }

    if (projectId) {
      // eslint-disable-next-line  @typescript-eslint/no-floating-promises
      getProjectById(projectId)
    }
  }, [projectId])

  return (
    <DropDown.Provider>
      <DropDown.ToggleBtn
        className={`w-full flex justify-between items-center p-1 hover:bg-gray-200 text-neutral-500 hover:text-neutral-700 rounded-sm transition-colors duration-75`}
      >
        {isFetching && <span>loading...</span>}
        {error && <span>there has been an error</span>}
        {currentProject && (
          <section className="w-full flex items-center justify-start">
            <Icon icon={GanttChart} />
            <h2 className="flex gap-2 items-center p-1 outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-blue-300 rounded-md transition-colors duration-75 font-medium"></h2>
          </section>
        )}
        <Icon icon={ChevronsUpDown} />
      </DropDown.ToggleBtn>
      <DropDown.DropeableZone className="flex flex-col gap-2 pl-3">
        <ProjectList />
      </DropDown.DropeableZone>
    </DropDown.Provider>
  )
}
