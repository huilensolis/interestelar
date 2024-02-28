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
  closeOnBlur?: boolean
  children: React.ReactNode
}

const DropDownToggleBtn = ({
  defaultState = 'close',
  closeOnBlur = false,
  children,
  className,
  ...props
}: TDropDownToggleBtnProps): JSX.Element => {
  const { toggleShowItems, open, close, showItems } = useDropDownContext()

  useEffect(() => {
    if (defaultState === 'open') open()

    if (defaultState === 'close') close()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultState])

  function handleBLur() {
    if (closeOnBlur && showItems) {
      close()
    }
  }

  return (
    <button
      onClick={toggleShowItems}
      onBlur={handleBLur}
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
