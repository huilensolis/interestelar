import { ProjectsAsideNav } from '@/components/features/projects-aside-nav'

export default function ProjectsLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <div className="flex w-full">
      <div className="border-r border-neutral-200 shadow-2xl shadow-gray-200 w-full max-w-80">
        <ProjectsAsideNav projectId={id} />
      </div>
      <main className="flex items-center justify-center p-4 w-full h-full">
        {children}
      </main>
    </div>
  )
}
