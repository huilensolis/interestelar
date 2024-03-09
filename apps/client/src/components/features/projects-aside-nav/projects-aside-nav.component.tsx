import { Hr } from '@/components/ui/hr'
import { NavLink } from '../nav-link'
import { ProjectsDropDown } from '../projects-drop-down'
import { Settings, UsersRound, type LucideIcon } from 'lucide-react'
import { UserCard } from '../user-card'
import { Icon } from '@/components/ui/icon'
import { ClientRouting } from '@/models/routes/client'

const NAV_LINKS: Array<{ title: string; icon: LucideIcon; href: string }> = [
  {
    title: 'Settings',
    icon: Settings,
    href: ClientRouting.projects().settings(),
  },
  {
    title: 'Members',
    icon: UsersRound,
    href: ClientRouting.projects().members(),
  },
]

export async function ProjectsAsideNav(): Promise<React.JSX.Element> {
  return (
    <aside className="flex flex-col justify-between items-center gap-2 w-full h-full min-h-screen p-2 py-4">
      <section className="w-full">
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
