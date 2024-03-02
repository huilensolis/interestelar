'use client'

import { ProjectsService } from '@/services/project'
import { type Project } from '@/types/project'
import { useEffect, useState } from 'react'
import { NavLink } from '../../nav-link'
import { Icon } from '@/components/ui/icon'
import { CircleFadingPlus } from 'lucide-react'
import { ClientRouting } from '@/models/routes/client'

export function ProjectList() {
  const [projectList, setProjectList] = useState<Project[]>([])
  const [error, setError] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    async function getProjectList() {
      try {
        setIsFetching(true)
        const { data, error } = await ProjectsService.getUserProjectList()

        if (!data || error) throw new Error('error getting project list')

        const { projects } = data

        setProjectList(projects)
        setError(false)
      } catch (error) {
        setError(true)
      } finally {
        setIsFetching(false)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProjectList()
  }, [])

  return (
    <ul className="flex flex-col relative mt-2 bg-gray-100">
      {isFetching && <span>loading...</span>}

      {!isFetching && projectList && (
        <ul className="flex flex-col gap-2 max-h-96 overflow-y-scroll border-x border-t border-neutral-300 rounded-tl-md rounded-tr-md p-1">
          {projectList.length > 0 &&
            projectList.map((project) => (
              <li key={project.id}>
                <NavLink
                  href={ClientRouting.app().projects().project(project.id)}
                >
                  <img
                    src={`https://avatar.vercel.sh/${project.name}`}
                    alt={`${project.name} image`}
                    className="w-10 rounded-full"
                  />
                  {project.name}
                </NavLink>
              </li>
            ))}
        </ul>
      )}
      <li className="w-full border border-neutral-300 rounded-br-md rounded-bl-md sticky bottom-0 left-0">
        <NavLink href={ClientRouting.app().projects().create()}>
          <Icon icon={CircleFadingPlus} className="h-10 w-10" />
          New Project
        </NavLink>
      </li>
      {error && <span>error fetching projects list</span>}
    </ul>
  )
}
