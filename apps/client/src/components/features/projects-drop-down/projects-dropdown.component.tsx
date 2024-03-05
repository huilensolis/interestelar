'use client'

import { DropDown } from '@/components/features/drop-down'
import { Icon } from '@/components/ui/icon'
import { ChevronsUpDown, LayoutGrid } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ClientRouting } from '@/models/routes/client'
import { ProjectsService } from '@/services/project'
import { type Project } from '@/types/project'
import { ProjectList } from './projects-list'
import { ProjectNavSkelenton } from './project-nav-skeleton'

export function ProjectsDropDown() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)

  const pathName = usePathname()

  useEffect(() => {
    const currentProjectId = pathName
      .split(ClientRouting.app().projects().project(''))
      .join('')
      .split('/')[3]

    if (currentProjectId) {
      setProjectId(currentProjectId)
    }
  }, [pathName])

  useEffect(() => {
    async function getProjectById(projectId: string) {
      try {
        setIsLoading(true)
        const { data, error } = await ProjectsService.getById(projectId)
        if (!data || error) throw new Error('error getting current project')

        const { project } = data

        if (!project) throw new Error('project not found')

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve('')
          }, 1000)
        )

        setCurrentProject(project)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (projectId) {
      // eslint-disable-next-line  @typescript-eslint/no-floating-promises
      getProjectById(projectId)
    }
  }, [projectId])

  return (
    <DropDown.Provider>
      <div className="relative">
        <DropDown.ToggleBtn
          className={`w-full flex justify-between items-center hover:bg-gray-200 text-neutral-500 hover:text-neutral-700 rounded-sm transition-colors duration-75`}
        >
          {isLoading && <ProjectNavSkelenton />}
          {error && (
            <div className="w-full flex px-1 py-1 items-center">
              <Icon icon={LayoutGrid} />
              <span className="px-2 font-medium">Projects</span>
            </div>
          )}
          {currentProject && (
            <section className="w-full flex items-center justify-start py-1">
              <h2 className="flex gap-2 items-center p-1 outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-blue-300 rounded-md transition-colors duration-75 font-medium">
                <img
                  src={`https://avatar.vercel.sh/${currentProject.name}`}
                  alt={`${currentProject.name} image`}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col items-start h-full">
                  <span className="text-sm leading-5">Projects</span>
                  <h4 className="leading-5 text-neutral-700">
                    {currentProject.name}
                  </h4>
                </div>
              </h2>
            </section>
          )}
          <Icon icon={ChevronsUpDown} />
        </DropDown.ToggleBtn>
        <DropDown.DropeableZone className="absolute top-full w-full">
          <ProjectList />
        </DropDown.DropeableZone>
      </div>
    </DropDown.Provider>
  )
}
