'use client'

import { DropDown } from '@/components/features/drop-down'
import { Icon } from '@/components/ui/icon'
import { ChevronsUpDown, GanttChart } from 'lucide-react'
import { NavLink } from '../nav-link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ClientRouting } from '@/models/routes/client'

type Props = {
  projects: Array<{ emote: string; title: string; href: string }>
}

export function ProjectsDropDown({ projects }: Props) {
  const [isOnPath, setIsOnPath] = useState<boolean>(false)

  const pathName = usePathname()

  useEffect(() => {
    if (pathName.startsWith(ClientRouting.app().projects().home()))
      setIsOnPath(true)
  }, [pathName])

  return (
    <DropDown.Provider>
      <DropDown.ToggleBtn
        defaultState={isOnPath ? 'open' : 'close'}
        className={`w-full flex justify-between items-center p-1 ${isOnPath ? 'bg-gray-200 text-neutral-700' : 'hover:bg-gray-200 text-neutral-500 hover:text-neutral-700'} rounded-sm transition-colors duration-75`}
      >
        <section className="w-full flex items-center justify-start">
          <Icon icon={GanttChart} />
          <span className="flex gap-2 items-center p-1 outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-blue-300 rounded-md transition-colors duration-75 font-medium">
            Projects
          </span>
        </section>
        <Icon icon={ChevronsUpDown} />
      </DropDown.ToggleBtn>
      <DropDown.DropeableZone className="flex flex-col gap-2 pl-3">
        {projects.map((project, i) => (
          <li key={i}>
            <NavLink href={project.href}>
              {project.emote} {project.title}
            </NavLink>
          </li>
        ))}
      </DropDown.DropeableZone>
    </DropDown.Provider>
  )
}
