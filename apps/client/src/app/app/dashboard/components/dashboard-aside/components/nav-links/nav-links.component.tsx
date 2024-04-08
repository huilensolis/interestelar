'use client'

import { NavLink } from '@/components/features/nav-link'
import { Icon } from '@/components/ui/icon'

import { NAV_LINKS } from './nav-links.model'

export function DashboardAsideNavLinks() {
  return (
    <ul className="w-full flex flex-col gap-2">
      {NAV_LINKS.map((link, i) => (
        <li key={i}>
          <NavLink href={link.href}>
            <Icon icon={link.icon} />
            {link.title}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
