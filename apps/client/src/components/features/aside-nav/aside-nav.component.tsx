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
import { ClientRouting } from '@/models/routes/client'
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

export async function AsideNav(): Promise<React.JSX.Element> {
  const PROJECTS: Array<{ emote: string; title: string; href: string }> = [
    {
      title: 'Screen Recorder',
      emote: '📸',
      href: ClientRouting.app().projects().project('Screen Recorder'),
    },
    {
      title: 'Memoir',
      emote: '📓',
      href: ClientRouting.app().projects().project('Memoir'),
    },
    {
      title: 'Culinary Alchemy',
      emote: '🍜',
      href: ClientRouting.app().projects().project('Culinary Alchemy'),
    },
    {
      title: 'Portfolio',
      emote: '🚀',
      href: ClientRouting.app().projects().project('Portfolio'),
    },
  ]

  return (
    <aside className="flex flex-col gap-2 h-full min-h-screen bg-gray-100 w-full max-w-80 p-2 py-4">
      <header className="flex justify-between items-center">
        <UserCard />
      </header>
      <Hr style="horizontal" />

      <ul className="flex flex-col gap-2">
        <li>
          <ProjectsDropDown projects={PROJECTS} />
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
    </aside>
  )
}
