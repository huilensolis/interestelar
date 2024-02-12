'use client'

import Link from 'next/link'

import type { TDropDownItemProps } from './item.models'

export const Item = ({
  title,
  emote,
  href,
  isActive = false,
}: TDropDownItemProps): React.JSX.Element => {
  return (
    <Link
      href={href}
      className={`w-full flex gap-2 transition-all duration-75 py-1 px-2 rounded-md ${isActive ? 'text-neutral-700 font-bold bg-gray-200' : 'text-neutral-600 hover:text-neutral-700 hover:bg-gray-200'}`}
    >
      {emote} {title}
    </Link>
  )
}
