import { Hr } from '@/components/ui/hr'
import { ProjectNavLinks } from './project-nav-links'
import { ProjectDropDown } from './project-drop-down'
import { Suspense } from 'react'
import { ProjectNavSkelenton } from '@/components/features/project-drop-down/project-nav-skeleton'
import { UserCard } from '@/components/features/user-card'

export function ProjectsAsideNav({
  projectId,
}: {
  projectId: string
}): React.JSX.Element {
  return (
    <aside className="flex flex-col justify-between items-center gap-2 w-full h-full min-h-screen p-2 py-4">
      <section className="w-full">
        <ul className="flex flex-col gap-2">
          <li>
            <Suspense fallback={<ProjectNavSkelenton />}>
              <ProjectDropDown projectId={projectId} />
            </Suspense>
          </li>
          <Hr style="horizontal" />
          <ProjectNavLinks projectId={projectId} />
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
