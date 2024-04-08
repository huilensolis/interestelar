'use client'

import { ButtonWithFeedback } from '@/components/ui/button/with-feed-back'
import { useState } from 'react'

import { type TStatus } from '@/components/ui/button/with-feed-back'
import { ProjectService } from '@/services/project'

export function InviteToProjectBtn({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) {
  const [status, setStatus] = useState<TStatus>('DEFAULT')

  async function invite() {
    try {
      setStatus('LOADING')

      const { error } = await ProjectService.members.invite({
        projectId,
        userReceptorId: userId,
      })

      if (error) throw new Error()
      setStatus('SUCCESS')
    } catch (error) {
      setStatus('ERROR')
    }
  }

  return (
    <ButtonWithFeedback
      status={status}
      onClick={invite}
      className="w-full max-w-28 rounded-md"
    >
      Invite
    </ButtonWithFeedback>
  )
}
