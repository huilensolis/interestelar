'use client'

import { useState, type ChangeEvent, useEffect } from 'react'

import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { TextInput } from '@/components/ui/text-input'
import { Search } from 'lucide-react'
import { PrimaryButton } from '@/components/ui/button/primary'
import { useDebounce } from '@/hooks/use-debounce'
import { UserService } from '@/services/user'
import { type User } from '@/types/user'
import { CardSkeleton } from './components/card-skeleton'
import { UserCard } from '../user-card'

export function InviteCollaborator() {
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

  useEffect(() => {
    async function searchUsers() {
      setIsLoading(true)
      const { users } = await UserService.getUsersByUsernameIlike({
        username: debouncedSearchValue,
        limit: 3,
      })

      setUsers(users)
      setIsLoading(false)
    }

    if (debouncedSearchValue) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      searchUsers()
      return
    }

    setUsers([])
  }, [debouncedSearchValue])

  return (
    <div className="relative w-full max-w-md">
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
              users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-start w-full"
                >
                  <UserCard user={user} />
                  <InviteToProject />
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

function InviteToProject() {
  // TODO:add invite option
  return <PrimaryButton className="rounded-xl">Invite</PrimaryButton>
}
