'use client'

import { useState, type ChangeEvent, useEffect } from 'react'

import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { TextInput } from '@/components/ui/text-input'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import { UserService } from '@/services/user'
import { type User } from '@/types/user'
import { CardSkeleton } from './components/card-skeleton'
import { UserCard } from '../user-card'
import { InviteToProjectBtn } from './components/invite-btn'
import { useUser } from '@/hooks/use-user'

export function InviteCollaborator({ projectId }: { projectId: string }) {
  const [searchValue, setSearchValue] = useState<string>('')

  const [users, setUsers] = useState<User[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  function validateSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setSearchValue(value)
  }

  const { debouncedValue: debouncedSearchValue } = useDebounce({
    value: searchValue,
    delay: 500,
  })

  const { user, loading: isLoadingUser } = useUser()

  useEffect(() => {
    async function searchUsers() {
      setIsLoading(true)
      const { users } = await UserService.getUsersByUsernameIlike({
        username: debouncedSearchValue,
        limit: 3,
      })

      if (user && !isLoadingUser) {
        setUsers(users.filter((userItem) => userItem.id !== user.id))
        setIsLoading(false)
        return
      }

      setUsers(users)
      setIsLoading(false)
    }

    if (debouncedSearchValue.trim()) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      searchUsers()
      return
    }

    setUsers([])
  }, [debouncedSearchValue])

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex flex-col items-start justify-center w-full p-3">
        <fieldset className="flex justify-start items-center w-full">
          <div className="flex items-center justify-start">
            <Icon icon={Search} className="text-neutral-500" />
            <TextInput.Input
              isDirty={false}
              hasError={false}
              className="bg-transparent border-none focus:outline-transparent"
              placeholder="invite members"
              onChange={validateSearchValue}
            />
          </div>
        </fieldset>
      </div>
      {(users.length > 0 || isLoading) && (
        <Box className="w-full h-max absolute left-0 top-full">
          <ul className="flex flex-col p-3 gap-4">
            {!isLoading &&
              users.length > 0 &&
              users.map((user) => (
                <li
                  key={user.id}
                  className="grid items-center justify-start w-full grid-cols-3"
                >
                  <div className="col-span-2">
                    <UserCard user={user} />
                  </div>
                  <div className="flex items-center justify-end">
                    <InviteToProjectBtn
                      projectId={projectId}
                      userId={user.id}
                    />
                  </div>
                </li>
              ))}
            {isLoading &&
              Array(3)
                .fill(' ')
                .map((_, i) => (
                  <li key={i}>
                    <CardSkeleton />
                  </li>
                ))}
          </ul>
        </Box>
      )}
    </div>
  )
}
