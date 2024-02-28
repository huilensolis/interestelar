'use client'

import { useEffect, type HTMLAttributes } from 'react'
import {
  DropDownProvider as DropDownContextProvider,
  useDropDownContext,
} from './context/drop-down.context'

function DropDownProvider({ children }: { children: React.ReactNode }) {
  return <DropDownContextProvider>{children}</DropDownContextProvider>
}

type TDropDownToggleBtnProps = HTMLAttributes<HTMLButtonElement> & {
  defaultState?: 'open' | 'close'
  children: React.ReactNode
}

const DropDownToggleBtn = ({
  defaultState = 'close',
  children,
  className,
  ...props
}: TDropDownToggleBtnProps): JSX.Element => {
  const { toggleShowItems, open, close } = useDropDownContext()

  useEffect(() => {
    if (defaultState === 'open') open()

    if (defaultState === 'close') close()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultState])

  return (
    <button
      onClick={toggleShowItems}
      className={[
        'outline outline-2 outline-transparent focus:outline-blue-300',
        className,
      ].join(' ')}
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
