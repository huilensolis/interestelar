import { BaseButton } from '..'
import { type TBaseButtonProps } from '../base-button.models'

export function PlainButton({
  className,
  loading,
  disabled,
  children,
  ...props
}: TBaseButtonProps) {
  const allProps = { loading, disabled, ...props }

  return (
    <BaseButton
      {...allProps}
      className={[className, 'hover:brightness-105'].join(' ')}
    >
      {children}
    </BaseButton>
  )
}
