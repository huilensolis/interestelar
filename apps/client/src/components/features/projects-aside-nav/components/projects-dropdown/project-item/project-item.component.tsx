import { type Project } from '@/types/project'
import { NavLink } from '../../nav-link'
import { ClientRouting } from '@/models/routes/client'

export function ProjectItem({ project }: { project: Project }) {
  return (
    <NavLink
      href={ClientRouting.app().projects().project(project.id)}
      className="py-2 px-2 focus:outline-transparent"
    >
      <img
        src={`https://avatar.vercel.sh/${project.name}`}
        alt={`${project.name} image`}
        className="w-10 rounded-full"
      />
      <span className="text-lg">{project.name}</span>
    </NavLink>
  )
}
