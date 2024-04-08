import { AlertOctagon, Check } from 'lucide-react'
import { type TBaseButtonProps } from '../base-button.models'
import { PlainButton } from '../plain'
import { type HTMLAttributes } from 'react'
import { Icon } from '../../icon'

export type TStatus = 'DEFAULT' | 'ERROR' | 'SUCCESS' | 'LOADING'

type TButtonProps = Omit<TBaseButtonProps, 'loading'> & {
  status: TStatus
}

const BtnClasses: Record<TStatus, HTMLAttributes<HTMLElement>['className']> = {
  DEFAULT: 'bg-neutral-900',
  LOADING: 'bg-neutral-900',
  ERROR: 'bg-red-600',
  SUCCESS: 'bg-green-500',
}

export function ButtonWithFeedback ({
  children,
  status,
  className = '',
  ...props
}: TButtonProps) {
  return (
    <PlainButton
      loading={ status === 'LOADING' }
      { ...props }
      className={ [className, 'text-neutral-50 max-h-9', BtnClasses[status]].join(' ') }
    >
      { status === 'ERROR' && (
        <div className="flex gap-1 items-center justify-center">
          <Icon icon={ AlertOctagon } />
          Error
        </div>
      ) }
      { status === 'SUCCESS' && <Check /> }
      { status === 'DEFAULT' && children }
    </PlainButton>
  )
}
