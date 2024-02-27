'use client'

import { type HTMLAttributes } from 'react'
import {
  DropDownProvider as DropDownContextProvider,
  useDropDownContext,
} from './context/drop-down.context'

function DropDownProvider({ children }: { children: React.ReactNode }) {
  return <DropDownContextProvider>{children}</DropDownContextProvider>
}

type TDropDownToggleIconProps = HTMLAttributes<HTMLButtonElement> & {
  closeIcon: React.ReactNode
  openIcon: React.ReactNode
}
const DropDownToggleIcon = ({
  closeIcon,
  openIcon,
  className,
  ...props
}: TDropDownToggleIconProps): JSX.Element => {
  const { toggleShowItems, showItems } = useDropDownContext()

  return (
    <button
      onClick={toggleShowItems}
      className={['', className].join(' ')}
      {...props}
    >
      {showItems ? closeIcon : openIcon}
    </button>
  )
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
}: TDropDownDropeableZoneProps): JSX.Element => {
  const { showItems } = useDropDownContext()

  return showItems ? (
    <ul className={['', className].join(' ')} {...props}>
      {children}
    </ul>
  ) : (
    <></>
  )
}

export const DropDown = Object.assign(
  {},
  {
    Provider: DropDownProvider,
    ToggleBtn: DropDownToggleBtn,
    toggleIcon: DropDownToggleIcon,
    DropeableZone: DropDownDropeableZone,
  }
)
