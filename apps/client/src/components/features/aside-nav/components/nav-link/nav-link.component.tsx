import Link from 'next/link'

import type { TNavLinkProps } from './nav-link.models'

export function NavLink({ href, children }: TNavLinkProps) {
  const isActive = false

  return (
    <Link
      href={href}
      className={`w-full flex gap-2 items-center p-1 outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-blue-300 rounded-md transition-colors duration-75 ${isActive ? 'text-neutral-800 font-semibold bg-neutral-200' : 'text-neutral-500 font-medium hover:text-neutral-700 hover:bg-neutral-200'}`}
    >
      {children}
    </Link>
  )
}
