import { type Project } from '@/types/project'
import { NavLink } from '../../nav-link'
import { ClientRouting } from '@/models/routes/client'
import { Avatar } from '@/components/ui/avatar/signle'

export function ProjectItem({ project }: { project: Project }) {
  return (
    <NavLink
      href={ClientRouting.projects().project(project.id)}
      className="py-2 px-2 focus:outline-transparent"
    >
      <Avatar
        src={`https://avatar.vercel.sh/${project.name}`}
        alt={`${project.name} image`}
      />
      <span className="text-md">{project.name}</span>
    </NavLink>
  )
}
