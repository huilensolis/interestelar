import { type HTMLAttributes } from 'react'

type TParagraphProps = HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode
}

export function Paragraph({ children, className, ...props }: TParagraphProps) {
  return (
    <p
      className={['text-neutral-700 text-pretty', className].join(' ')}
      {...props}
    >
      {children}
    </p>
  )
}
