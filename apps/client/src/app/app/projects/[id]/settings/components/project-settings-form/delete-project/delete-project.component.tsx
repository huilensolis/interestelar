'use client'

import { Portal } from '@/components/features/portal'
import { DangerousButton } from '@/components/ui/button/dangerous'
import { useState } from 'react'
import { DeleteProjectModal } from './components/delete-project-modal'
import { Paragraph } from '@/components/ui/paragraph'
import { InlineLink } from '@/components/ui/inline-link'
import { ClientRouting } from '@/models/routes/client'

export function DeleteProjectBtn({ projectName }: { projectName: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <DangerousButton className="w-full" type="button" onClick={openModal}>
        Delete Project
      </DangerousButton>
      {isModalOpen && (
        <Portal onClose={closeModal}>
          <div>
            <header className="mb-4">
              <h1 className="font-semibold text-xl text-neutral-800">
                Delete project
              </h1>
              <Paragraph className="w-full max-w-96 text-neutral-700">
                This action is reversible. Once you delete this project, you can{' '}
                <InlineLink href={ClientRouting.projects().restore()}>
                  restore
                </InlineLink>{' '}
                it. if you dont{' '}
                <InlineLink href={ClientRouting.projects().restore()}>
                  restore
                </InlineLink>{' '}
                it in the next 30 days, it will be{' '}
                <strong className="text-red-500 font-semibold">
                  permanently deleted{' '}
                </strong>
                .
              </Paragraph>
            </header>
            <DeleteProjectModal projectName={projectName} />
          </div>
        </Portal>
      )}
    </div>
  )
}
