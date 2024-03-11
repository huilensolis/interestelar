import { BaseButton } from '..'
import { type TBaseButtonProps } from '../base-button.models'

type TDangerousButtonProps = TBaseButtonProps

export function DangerousButton({
  children,
  className,
  ...props
}: TDangerousButtonProps) {
  return (
    <BaseButton
      {...props}
      className={[
        'bg-red-500 text-neutral-50 py-2 px-4 disabled:bg-red-400 hover:brightness-105 hover:disabled:brightness-100 transition-all duration-75',
        className,
      ].join(' ')}
    >
      {children}
    </BaseButton>
  )
}
