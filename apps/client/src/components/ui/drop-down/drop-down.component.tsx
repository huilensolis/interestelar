'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

import type { TDropDownProps } from './drop-down.models'
import { Item } from './components/item'
import { Icon } from '../icon'

const DropDownRoot = ({
  title,
  icon,
  children,
  href = '',
}: TDropDownProps): React.JSX.Element => {
  const [drop, setDrop] = useState(false)

  function toggleDrop() {
    setDrop(!drop)
  }

  const HeaderIcon = icon

  return (
    <article className="flex flex-col gap-1">
      <header className="w-full flex justify-between hover:bg-gray-200 rounded-md">
        <button
          onClick={toggleDrop}
          className="w-full flex items-center p-1 focus:outline-blue-300 focus-visible:outline-blue-300"
        >
          <Link
            className="w-full flex items-center gap-2 hover:bg-gray-200"
            href={href}
          >
            <Icon icon={HeaderIcon} /> <h3 className="font-medium">{title}</h3>
          </Link>
          {drop ? <Icon icon={ChevronUp} /> : <Icon icon={ChevronDown} />}
        </button>
      </header>
      {drop && (
        <div className="flex items-stretch w-full pl-4 p-1">
          <div className="bg-gray-300 h-auto w-[2px] rounded-sm" />
          <div className="flex flex-col gap-2 w-full">{children}</div>
        </div>
      )}
    </article>
  )
}

export const DropDown = Object.assign(DropDownRoot, { Item })
