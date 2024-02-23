import { type ButtonHTMLAttributes } from 'react'

export type TBaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
}
