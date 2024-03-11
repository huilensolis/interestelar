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
        'bg-neutral-600 text-neutral-50 py-2 px-4 hover:brightness-105 hover:disabled:brightness-100 transition-all duration-75 flex items-center justify-center disabled:bg-neutral-500',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
