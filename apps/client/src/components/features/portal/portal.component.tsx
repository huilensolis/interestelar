import { PlainButton } from '@/components/ui/button/plain'
import { Icon } from '@/components/ui/icon'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

type TPortalProps = {
  children: React.ReactNode
  onClose: () => void
}

export function Portal({ children, onClose }: TPortalProps) {
  function close() {
    onClose()
  }

  return (
    <>
      {createPortal(
        <div className="absolute top-0 l-0 h-screen w-full bg-neutral-700/20 flex items-center justify-center p-4 shadow-sm shadow-neutral-800">
          <article className="bg-gray-100 p-4 flex flex-col rounded-md border border-gray-300">
            <header className="w-full flex items-center justify-end">
              <PlainButton type="button" onClick={close}>
                <Icon icon={X} />
              </PlainButton>
            </header>
            {children}
          </article>
        </div>,
        window.document.body
      )}
    </>
  )
}
