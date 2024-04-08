import { BaseButton } from '..'
import { type TBaseButtonProps } from '../base-button.models'

export function GhostButton({
  className,
  children,
  ...props
}: TBaseButtonProps) {
  return (
    <BaseButton
      {...props}
      className={[
        className,
        'border border-neutral-300 bg-transparent hover:bg-neutral-500/5',
      ].join(' ')}
    >
      {children}
    </BaseButton>
  )
}
