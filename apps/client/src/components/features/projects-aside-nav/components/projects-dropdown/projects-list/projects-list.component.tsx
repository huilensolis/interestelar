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
    <ul>
      {isFetching && <span>loading...</span>}
      {!isFetching &&
        projectList.length > 0 &&
        projectList.map((project) => <li key={project.id}>{project.name}</li>)}
      {error && <span>error fetching projects list</span>}
      <NavLink href={ClientRouting.app().projects().create()}>
        <Icon icon={CircleFadingPlus} />
        New Project
      </NavLink>
    </ul>
  )
}
