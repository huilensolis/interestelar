import { Bolt, CircleUser, type LucideIcon } from 'lucide-react'

type TUserCardLink = {
  title: string
  icon: LucideIcon
  href: string
}

export const USER_LINKS: TUserCardLink[] = [
  {
    title: 'Profile',
    href: 'profile',
    icon: CircleUser,
  },
  {
    title: 'Configuration',
    href: 'conf',
    icon: Bolt,
  },
]
