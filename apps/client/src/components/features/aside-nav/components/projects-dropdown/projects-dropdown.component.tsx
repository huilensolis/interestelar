'use client'

import { DropDown } from '@/components/features/drop-down'
import { Icon } from '@/components/ui/icon'
import { ChevronsUpDown, GanttChart } from 'lucide-react'
import { NavLink } from '../nav-link'

type Props = {
  projects: Array<{ emote: string; title: string; href: string }>
}

export function ProjectsDropDown({ projects }: Props) {
  return (
    <DropDown.Provider>
      <DropDown.ToggleBtn className="w-full flex justify-between items-center p-1 hover:bg-neutral-200 rounded-sm transition-colors duration-75 text-neutral-700">
        <section className="w-full flex items-center justify-start">
          <Icon icon={GanttChart} />
          <span className="flex gap-2 items-center p-1 outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-blue-300 rounded-md transition-colors duration-75 text-neutral-500 font-medium hover:text-neutral-700">
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
