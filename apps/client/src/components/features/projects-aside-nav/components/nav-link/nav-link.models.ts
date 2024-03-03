import { type HTMLAttributes } from 'react'

export type TNavLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: React.ReactNode | React.ReactNode[]
}
