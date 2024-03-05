'use client'

import { DropDown } from '@/components/features/drop-down'
import { Icon } from '@/components/ui/icon'
import {
  Bolt,
  ChevronsUpDown,
  CircleUser,
  ListTodo,
  type LucideIcon,
} from 'lucide-react'
import { Hr } from '@/components/ui/hr'
import { NavLink } from '../nav-link'
import { LogOutBtn } from './components/log-out-btn'
import { Box } from '@/components/ui/box'

export function UserCard() {
  const USER_LINKS: Array<{ title: string; icon: LucideIcon; href: string }> = [
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
    {
      title: 'Tasks assigned to me',
      href: 'my tasks',
      icon: ListTodo,
    },
  ]

  return (
    <div className="relative w-full">
      <DropDown.Provider>
        <DropDown.ToggleBtn className="w-full flex items-center justify-between hover:bg-gray-200 transition-colors duration-75 py-1 px-1 rounded-md z-10">
          <article className="flex gap-2 items-center">
            <img
              src="https://avatar.vercel.sh/slug"
              alt="alt"
              className="w-12 h-full object-cover object-center rounded-full"
            />
            <section className="h-full flex flex-col justify-center items-start">
              <h2 className="text-neutral-700 text-lg font-semibold leading-5">
                Huilen Solis
              </h2>
              <span className="text-neutral-500 leading-5">@huilensolis</span>
            </section>
          </article>
          <Icon icon={ChevronsUpDown} />
        </DropDown.ToggleBtn>
        <DropDown.DropeableZone className="absolute bottom-full mb-2 left-0 w-full">
          <Box className="w-full flex flex-col gap-2 p-1">
            {USER_LINKS.map((item, i) => (
              <li key={i}>
                <NavLink href={item.href}>
                  <Icon icon={item.icon} />
                  {item.title}
                </NavLink>
              </li>
            ))}
            <Hr style="horizontal" />
            <LogOutBtn />
          </Box>
        </DropDown.DropeableZone>
      </DropDown.Provider>
    </div>
  )
}
