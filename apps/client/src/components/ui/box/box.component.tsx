import type { HTMLAttributes } from 'react'

type TProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export function Box({ children, className, ...props }: TProps) {
  return (
    <div
      className={[
        className,
        'bg-gray-100 border border-neutral-200 shadow-md shadow-gray-200 rounded-lg',
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
