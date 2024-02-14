'use client'

import { DropDown } from '@/components/ui/drop-down'
import { GanttChart } from 'lucide-react'

type Props = {
  projects: Array<{ emote: string; title: string; href: string }>
}

export async function ProjectsDropDown({ projects }: Props) {
  return (
    <DropDown title="Projects" displayListLength={false} icon={GanttChart}>
      {projects.map((project, i) => (
        <DropDown.Item
          title={project.title}
          emote={project.emote}
          href={project.href}
          isActive={Boolean(i === 0)}
          key={i}
        />
      ))}
    </DropDown>
  )
}
