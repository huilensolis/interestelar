import { createContext, useContext, useState } from 'react'
import { type TDropDownContext } from './drop-down.models'

const DropDownContext = createContext<TDropDownContext | undefined>(undefined)

export function DropDownProvider({ children }: { children: React.ReactNode }) {
  const [showItems, setShowItems] = useState(false)

  function toggleShowItems() {
    setShowItems(!showItems)
  }

  function open() {
    setShowItems(true)
  }

  function close() {
    setShowItems(false)
  }

  return (
    <DropDownContext.Provider
      value={{ showItems, toggleShowItems, open, close }}
    >
      {children}
    </DropDownContext.Provider>
  )
}

export function useDropDownContext() {
  const context = useContext(DropDownContext)

  if (!context) throw new Error('DropDownProvider is not in DropDownContext')

  return context
}
