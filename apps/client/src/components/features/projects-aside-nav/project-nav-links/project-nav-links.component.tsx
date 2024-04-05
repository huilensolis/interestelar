'use client'

import { Settings, UsersRound, type LucideIcon, Columns3 } from 'lucide-react'
import { NavLink } from '../../nav-link'
import { Icon } from '@/components/ui/icon'
import { ClientRouting } from '@/models/routes/client'

export function ProjectNavLinks({ projectId }: { projectId: string }) {
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
    <ul className="flex flex-col gap-2">
      {NAV_LINKS.map((item, i) => (
        <li key={i}>
          <NavLink href={item.href}>
            <Icon icon={item.icon} /> {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
