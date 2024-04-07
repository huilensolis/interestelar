'use client'

import { ButtonWithFeedback } from '@/components/ui/button/with-feed-back'
import { useState } from 'react'

import { type TStatus } from '@/components/ui/button/with-feed-back'

export function InviteToProjectBtn () {
  const [status, setStatus] = useState<TStatus>('DEFAULT')

  async function invite () {
    try {
      setStatus('LOADING')

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve('')
        }, 1000)
      )

      if (Math.random() * 100 > 45) throw new Error('')

      setStatus('SUCCESS')
    } catch (error) {
      setStatus('ERROR')
    }
  }

  return (
    <ButtonWithFeedback status={ status } onClick={ invite } className='w-full max-w-28 rounded-md'>
      Invite
    </ButtonWithFeedback>
  )
}
