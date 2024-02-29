import { ProjectsAsideNav } from '@/components/features/projects-aside-nav'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full">
      <ProjectsAsideNav />
      {children}
    </div>
  )
}
