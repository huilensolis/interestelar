import { BaseButton } from '..'
import { type TBaseButtonProps } from '../base-button.models'

type TPrimaryButtonProps = TBaseButtonProps

export function PrimaryButton({
  children,
  loading,
  disabled,
  className,
  ...props
}: TPrimaryButtonProps) {
  return (
    <BaseButton
      loading={loading}
      disabled={disabled}
      className={[
        'bg-neutral-950 text-neutral-50 hover:bg-neutral-800 disabled:bg-neutral-500',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
