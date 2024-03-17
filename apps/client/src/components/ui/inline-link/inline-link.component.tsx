import Link from 'next/link'
import { type HtmlHTMLAttributes } from 'react'

export type TInlineLinkProps = HtmlHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
  href: string
  target?: '_blank' | '_self' | '_top' | '_parent'
}

export function InlineLink({
  children,
  className,
  href,
  target = '_self',
  ...props
}: TInlineLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      {...props}
      className={['text-blue-500', className].join(' ')}
    >
      {children}
    </Link>
  )
}
