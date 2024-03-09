'use client'

import { ProjectsService } from '@/services/project'
import { type Project } from '@/types/project'
import { useEffect, useState } from 'react'
import { NavLink } from '../../nav-link'
import { Icon } from '@/components/ui/icon'
import { ClientRouting } from '@/models/routes/client'
import { Box } from '@/components/ui/box'
import { ArrowUpRight, Search } from 'lucide-react'
import { TextInput } from '@/components/ui/text-input'
import { useDebounce } from '@/hooks/use-debounce'
import { ProjectItem } from '../project-item'
import { ProjectItemSkeleton } from '../project-item-skeleton'

export function ProjectList() {
  const [projectList, setProjectList] = useState<Project[]>([])
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [inputSearchValue, setInputSearchValue] = useState<string>('')
  const [searchedProjects, setSearchedProjects] = useState<Project[] | null>(
    null
  )

  useEffect(() => {
    async function getProjectList() {
      try {
        setIsLoading(true)
        const { data, error } = await ProjectsService.getUserProjectList()

        if (!data || error) throw new Error('error getting project list')

        const { projects } = data

        setProjectList(projects)
        setError(false)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProjectList()
  }, [])

  const { debouncedValue: debouncedSearchProjectValue } = useDebounce({
    delay: 300,
    value: inputSearchValue,
  })

  function handleInputSearchOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsLoading(true)
    setInputSearchValue(e.target.value)
  }

  useEffect(() => {
    if (projectList.length > 0) {
      setSearchedProjects(
        projectList.filter((project) =>
          project.name
            .toLowerCase()
            .trim()
            .startsWith(debouncedSearchProjectValue.toLowerCase().trim())
        )
      )
    } else {
      setSearchedProjects([])
    }

    if (debouncedSearchProjectValue) {
      setIsLoading(false)
    }

    if (debouncedSearchProjectValue.length === 0) {
      setIsLoading(false)
      setSearchedProjects(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchProjectValue])
  return (
    <ul className="flex flex-col relative mt-2 bg-gray-100">
      <Box className="flex items-center w-full p-2 py-1 rounded-bl-none rounded-br-none">
        <Icon icon={Search} className="text-neutral-500" />
        <TextInput.Input
          isDirty={false}
          hasError={false}
          className="bg-transparent border-none focus:outline-transparent"
          placeholder="Search projects"
          onChange={handleInputSearchOnChange}
        />
      </Box>
      <Box className="border-b-0 rounded-tl-none rounded-tr-none p-1 border-t-0 rounded-b-none">
        <ul className="flex flex-col max-h-96 overflow-y-auto">
          {isLoading &&
            Array(4)
              .fill(' ')
              .map((_, i) => (
                <li key={i} className="px-1">
                  <ProjectItemSkeleton />
                </li>
              ))}
          {!isLoading &&
            projectList.length > 0 &&
            !searchedProjects &&
            projectList.map((project) => (
              <li key={project.id}>
                <ProjectItem project={project} />
              </li>
            ))}
          {!isLoading &&
            searchedProjects &&
            searchedProjects.length > 0 &&
            searchedProjects.map((project) => (
              <li key={project.id}>
                <ProjectItem project={project} />
              </li>
            ))}
          {!isLoading && searchedProjects && searchedProjects.length === 0 && (
            <span className="p-2">not found</span>
          )}
          {error && <span>error fetching projects list</span>}
        </ul>
      </Box>
      <Box className="rounded-tr-none rounded-tl-none">
        <li className="w-full sticky bottom-0 left-0">
          <NavLink href={ClientRouting.projects().create()} className="py-2">
            <Icon icon={ArrowUpRight} className="h-10 w-10" />
            New Project
          </NavLink>
        </li>
      </Box>
    </ul>
  )
}
