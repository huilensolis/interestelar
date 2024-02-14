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
    <div className="w-full flex gap-1 justify-stretch relative pl-3">
      {isActive && (
        <div className="bg-gray-500 h-full w-[2px] absolute top-0 -left-[2px] rounded-sm" />
      )}
      <Link
        href={href}
        className={`w-full flex gap-2 transition-all duration-75 py-1 px-2 rounded-sm outline outline-2 outline-transparent focus:outline-blue-300 focus-visible:outline-300 ${isActive ? 'text-neutral-800 font-semibold' : 'font-medium text-neutral-600 hover:text-neutral-800'}`}
      >
        <span>{emote}</span> <span>{title}</span>
      </Link>
    </div>
  )
}
