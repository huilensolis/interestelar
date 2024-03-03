import { Hr } from '@/components/ui/hr'
import { NavLink } from './components/nav-link'
import { ProjectsDropDown } from './components/projects-dropdown'
import {
  Calendar,
  Map,
  Settings,
  UsersRound,
  PlusCircle,
  type LucideIcon,
} from 'lucide-react'
import { UserCard } from './components/user-card'
import { Icon } from '@/components/ui/icon'

const NAV_LINKS: Array<{ title: string; icon: LucideIcon; href: string }> = [
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/calendar',
  },
  {
    title: 'Roadmap',
    icon: Map,
    href: '/map',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    title: 'Members',
    icon: UsersRound,
    href: '/members',
  },
  {
    title: 'New Project',
    icon: PlusCircle,
    href: '/new project',
  },
]

export async function ProjectsAsideNav(): Promise<React.JSX.Element> {
  return (
    <aside className="flex flex-col justify-between items-center gap-2 w-full h-full min-h-screen p-2 py-4">
      <section className="w-full">
        <Hr style="horizontal" />
        <ul className="flex flex-col gap-2">
          <li>
            <ProjectsDropDown />
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
