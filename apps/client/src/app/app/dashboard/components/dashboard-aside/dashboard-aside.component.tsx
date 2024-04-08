import { UserCard } from '@/components/features/user-card'
import { DashboardAsideNavLinks } from './components/nav-links/nav-links.component'
import { Hr } from '@/components/ui/hr'

export function DashboardAside() {
  return (
    <aside className="flex flex-col items-center gap-2 w-full h-full min-h-screen p-2 py-4">
      <UserCard />
      <Hr style="horizontal" />
      <DashboardAsideNavLinks />
    </aside>
  )
}
