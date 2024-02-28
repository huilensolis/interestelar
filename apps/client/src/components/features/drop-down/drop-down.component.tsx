'use client'

import { type HTMLAttributes } from 'react'
import {
  DropDownProvider as DropDownContextProvider,
  useDropDownContext,
} from './context/drop-down.context'

function DropDownProvider({ children }: { children: React.ReactNode }) {
  return <DropDownContextProvider>{children}</DropDownContextProvider>
}

type TDropDownToggleBtnProps = HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

const DropDownToggleBtn = ({
  children,
  className,
  ...props
}: TDropDownToggleBtnProps): JSX.Element => {
  const { toggleShowItems } = useDropDownContext()

  return (
    <button
      onClick={toggleShowItems}
      className={['', className].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

type TDropDownDropeableZoneProps = HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode
}
const DropDownDropeableZone = ({
  children,
  className,
  ...props
}: TDropDownDropeableZoneProps) => {
  const { showItems } = useDropDownContext()

  return showItems ? (
    <ul className={['', className].join(' ')} {...props}>
      {children}
    </ul>
  ) : null
}

export const DropDown = Object.assign(
  {},
  {
    Provider: DropDownProvider,
    ToggleBtn: DropDownToggleBtn,
    DropeableZone: DropDownDropeableZone,
  }
)
