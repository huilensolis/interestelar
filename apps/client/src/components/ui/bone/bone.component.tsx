import { type HTMLAttributes } from 'react'

type TProps = HTMLAttributes<HTMLDivElement>

export function Bone({ className, ...props }: TProps) {
  return (
    <div
      className={['bg-gray-300 animate-pulse duration-1000', className].join(
        ' '
      )}
      {...props}
    />
  )
}
