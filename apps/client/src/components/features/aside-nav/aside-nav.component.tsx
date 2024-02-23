import { Hr } from '@/components/ui/hr'
import { NavLink } from './components/nav-link'
import type { TNavLinkProps } from './components/nav-link/nav-link.models'
import { ProjectsDropDown } from './components/projects-dropdown'
import { Calendar, Map, Settings, UsersRound, PlusCircle } from 'lucide-react'
import { ClientRouting } from '@/models/routes/client'

const NAV_LINKS: TNavLinkProps[] = [
  {
    title: 'Calendar',
    icon: Calendar,
    href: 'calendar',
  },
  {
    title: 'Roadmap',
    icon: Map,
    href: 'map',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: 'settings',
  },
  {
    title: 'Members',
    icon: UsersRound,
    href: 'members',
  },
  {
    title: 'New Project',
    icon: PlusCircle,
    href: 'new project',
  },
]

export async function AsideNav(): Promise<React.JSX.Element> {
  const PROJECTS: Array<{ emote: string; title: string; href: string }> = [
    {
      title: 'Screen Recorder',
      emote: '📸',
      href: ClientRouting.app().project('Screen Recorder'),
    },
    {
      title: 'Memoir',
      emote: '📓',
      href: ClientRouting.app().project('Memoir'),
    },
    {
      title: 'Culinary Alchemy',
      emote: '🍜',
      href: ClientRouting.app().project('Culinary Alchemy'),
    },
    {
      title: 'Portfolio',
      emote: '🚀',
      href: ClientRouting.app().project('Portfolio'),
    },
  ]

  return (
    <aside className="flex flex-col gap-2 h-full min-h-screen bg-gray-100 w-full max-w-80 p-2">
      <header className="flex justify-between items-center py-4 px-1">
        <section className="flex gap-2 items-center">
          <img
            src="https://i.pinimg.com/564x/57/a9/91/57a99101093e71ddacdf9639b5d579ea.jpg"
            alt="alt"
            className="w-10 h-full object-cover object-center rounded-md"
          />{' '}
          <h2 className="text-lg font-semibold">Memoir org</h2>
        </section>
      </header>
      <Hr style="horizontal" />

      <ul className="flex flex-col gap-2">
        <li>
          <ProjectsDropDown projects={PROJECTS} />
        </li>
        {NAV_LINKS.map((navLink, i) => (
          <li key={i}>
            <NavLink
              href={navLink.href}
              icon={navLink.icon}
              title={navLink.title}
            />
          </li>
        ))}
        <Hr style="horizontal" />
      </ul>
    </aside>
  )
}
