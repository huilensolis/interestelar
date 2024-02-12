import type { LucideIcon, LucideProps } from 'lucide-react'

type TIconProps = LucideProps & {
  icon: LucideIcon
}

export function Icon({ icon, className, ...props }: TIconProps) {
  const Icon = icon

  return <Icon className={['w-7 h-7 p-1', className].join('')} {...props} />
}
