'use client'

import { PrimaryButton } from '@/components/ui/button/primary'
import { ClientRouting } from '@/models/routes/client'
import { ProjectService } from '@/services/project'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function JoinProjectBtn({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  async function joinProject() {
    try {
      setLoading(true)

      const { error } = await ProjectService.members.acceptInvitation({
        projectId,
      })

      if (error) throw new Error()

      router.push(ClientRouting.projects().project(projectId).home())
    } catch (error) {
      console.log(error)
      //
    } finally {
      setLoading(false)
    }
  }

  return (
    <PrimaryButton
      className="rounded-md"
      onClick={joinProject}
      loading={loading}
    >
      Join Project
    </PrimaryButton>
  )
}
