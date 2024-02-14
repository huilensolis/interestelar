type TStylesOtpions = 'horizontal' | 'vertical'

type TProps = {
  style: TStylesOtpions
}

const STYLES: Record<TStylesOtpions, string> = {
  horizontal: 'w-full h-[2px] bg-gray-200 rounded-md',
  vertical: 'h-full w-[2px] bg-gray-200 rounded-md',
}

export function Hr({ style }: TProps) {
  return <hr className={STYLES[style]} />
}
