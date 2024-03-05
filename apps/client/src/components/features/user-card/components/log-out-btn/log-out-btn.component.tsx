'use client'

import { PlainButton } from '@/components/ui/button/plain'
import { Icon } from '@/components/ui/icon'
import { useSession } from '@/hooks/use-session'
import { ClientRouting } from '@/models/routes/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LogOutBtn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signOut } = useSession()

  const router = useRouter()

  async function handleSignOut() {
    try {
      setIsLoading(true)

      await signOut()

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve('')
        }, 2000)
      )

      setIsLoading(false)

      router.push(ClientRouting.auth().signIn())
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <PlainButton
      className="flex items-center justify-start gap-2 p-1"
      onClick={handleSignOut}
      disabled={isLoading}
      loading={isLoading}
    >
      <Icon icon={LogOut} /> Log Out
    </PlainButton>
  )
}
