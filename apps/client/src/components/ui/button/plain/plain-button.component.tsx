import { BaseButton } from '..'
import { type TBaseButtonProps } from '../base-button.models'

export function PlainButton({
  className,
  loading,
  disabled,
  children,
  ...props
}: TBaseButtonProps) {
  const allProps = { loading, disabled, props }

  return (
    <BaseButton
      {...allProps}
      className={[
        'text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 transition-colors duration-75',
        className,
      ].join(' ')}
    >
      {children}
    </BaseButton>
  )
}
