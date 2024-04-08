import { ClientRouting } from '@/models/routes/client'
import { Home, Inbox, type LucideIcon, Package } from 'lucide-react'

type TNavLink = { title: string; icon: LucideIcon; href: string }

export const NAV_LINKS: TNavLink[] = [
  {
    title: 'Home',
    icon: Home,
    href: ClientRouting.app().home(),
  },
  {
    title: 'Projects',
    icon: Package,
    href: ClientRouting.app().projects(),
  },
  {
    title: 'Inbox',
    icon: Inbox,
    href: ClientRouting.app().inbox(),
  },
]
