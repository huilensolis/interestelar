import type { HTMLAttributes } from 'react'

type TProps = HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode
}

export function Chip({ children, ...props }: TProps) {
  return (
    <span {...props} className="py-1 px-3 rounded-full">
      {children}
    </span>
  )
}
