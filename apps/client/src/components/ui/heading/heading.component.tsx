import { type ReactNode } from 'react'

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-semibold text-2xl tracking-tight whitespace-nowrap text-pretty">
      {children}
    </h1>
  )
}
