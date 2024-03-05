'use client'

import { DropDown } from '@/components/features/drop-down'
import { Icon } from '@/components/ui/icon'
import { ChevronsUpDown } from 'lucide-react'
import { Hr } from '@/components/ui/hr'
import { NavLink } from '../nav-link'
import { LogOutBtn } from './components/log-out-btn'
import { Box } from '@/components/ui/box'
import { USER_LINKS } from './user-card.models'
import { useEffect, useState } from 'react'
import { useSession } from '@/hooks/use-session'
import { type User } from '@/types/user'
import { UserCardSkeleton } from './components/user-card-skeleton'

export function UserCard() {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const { getUser } = useSession()

  useEffect(() => {
    async function syncUserData(): Promise<void> {
      const { user } = await getUser()

      if (!user) return

      setUserInfo(user)

      setLoading(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    syncUserData()
  }, [])

  return (
    <div className="relative w-full">
      <DropDown.Provider>
        <DropDown.ToggleBtn className="w-full flex items-center justify-between hover:bg-gray-200 transition-colors duration-75 py-1 px-1 rounded-md z-10">
          {!loading && userInfo && (
            <article className="flex gap-2 items-center">
              <img
                src={`https://avatar.vercel.sh/${userInfo.id}`}
                alt="alt"
                className="w-12 h-12 object-cover object-center rounded-full"
              />
              <section className="h-full flex flex-col justify-center items-start">
                <h4 className="text-neutral-700 text-lg font-semibold leading-5">
                  {userInfo.username}
                </h4>
                <span className="text-neutral-500 leading-5">
                  {userInfo.email}
                </span>
              </section>
            </article>
          )}
          {loading && <UserCardSkeleton />}
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
