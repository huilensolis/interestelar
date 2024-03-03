import type { HTMLAttributes } from 'react'

type TProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export function Box({ children, className, ...props }: TProps) {
  return (
    <div
      className={[
        className,
        'bg-gray-100 border border-neutral-300 shadow-2xl shadow-gray-300 rounded-lg',
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
