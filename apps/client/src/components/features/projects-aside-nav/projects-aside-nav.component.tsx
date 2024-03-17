'use client'

import { Hr } from '@/components/ui/hr'
import { NavLink } from '../nav-link'
import { ProjectsDropDown } from '../projects-drop-down'
import { Settings, UsersRound, type LucideIcon, Columns3 } from 'lucide-react'
import { UserCard } from '../user-card'
import { Icon } from '@/components/ui/icon'
import { ClientRouting } from '@/models/routes/client'

export function ProjectsAsideNav({
  projectId,
}: {
  projectId: string
}): React.JSX.Element {
  const NAV_LINKS: Array<{ title: string; icon: LucideIcon; href: string }> = [
    {
      title: 'Board',
      icon: Columns3,
      href: ClientRouting.projects().project(projectId).board(),
    },
    {
      title: 'Settings',
      icon: Settings,
      href: ClientRouting.projects().project(projectId).settings(),
    },
    {
      title: 'Members',
      icon: UsersRound,
      href: ClientRouting.projects().project(projectId).members(),
    },
  ]

  return (
    <aside className="flex flex-col justify-between items-center gap-2 w-full h-full min-h-screen p-2 py-4">
      <section className="w-full">
        <ul className="flex flex-col gap-2">
          <li>
            <ProjectsDropDown projectId={projectId} />
          </li>
          {NAV_LINKS.map((item, i) => (
            <li key={i}>
              <NavLink href={item.href}>
                <Icon icon={item.icon} /> {item.title}
              </NavLink>
            </li>
          ))}
          <Hr style="horizontal" />
        </ul>
      </section>
      <section className="w-full">
        <ul className="flex flex-col gap-2">
          <li>
            <UserCard />
          </li>
        </ul>
      </section>
    </aside>
  )
}
