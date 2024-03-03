import { ProjectsAsideNav } from '@/components/features/projects-aside-nav'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full">
      <div className="border-r border-neutral-200 shadow-2xl shadow-gray-200 w-full max-w-80">
        <ProjectsAsideNav />
      </div>
      {children}
    </div>
  )
}
