import Link from 'next/link'

import { Icon } from '@/components/ui/icon'
import type { TNavLinkProps } from './nav-link.models'

export function NavLink({ href, icon, title }: TNavLinkProps) {
  const navIcon = icon

  const isActive = false

  return (
    <Link
      href={href}
      className={`w-full flex gap-2 items-center p-1 outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-blue-300 rounded-md transition-colors duration-75 ${isActive ? 'text-neutral-800 font-semibold' : 'text-neutral-500 font-medium hover:text-neutral-700'}`}
    >
      <Icon icon={navIcon} />
      {title}
    </Link>
  )
}
