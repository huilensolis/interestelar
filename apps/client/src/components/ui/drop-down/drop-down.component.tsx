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
    <article>
      <header className="w-full flex justify-between items-center">
        <Link
          className="w-full flex items-center gap-2 rounded-md hover:bg-gray-200 p-1"
          href={href}
        >
          <Icon icon={HeaderIcon} /> <h3 className="font-medium">{title}</h3>
        </Link>
        <button
          onClick={toggleDrop}
          className="h-full hover:bg-gray-200 rounded-sm"
        >
          {drop ? <Icon icon={ChevronUp} /> : <Icon icon={ChevronDown} />}
        </button>
      </header>
      {drop && (
        <section className="flex items-stretch">
          <div className="pl-5 pr-2">
            <hr className="h-full bg-neutral-400 rounded-md w-[2px]" />
          </div>
          <div className="flex flex-col w-full">{children}</div>
        </section>
      )}
    </article>
  )
}

export const DropDown = Object.assign(DropDownRoot, { Item })
