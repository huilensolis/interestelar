import { forwardRef } from 'react'

type TTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isDirty: boolean
  hasError: boolean
}

const Input = forwardRef<HTMLInputElement, TTextInputProps>(function Component(
  { isDirty, hasError, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={[
        `w-full p-2 rounded-md font-medium text-neutral-700 placeholder:text-neutral-400 placeholder:font-medium transition-colors duration-75 border ${!isDirty ? 'border-neutral-300 focus:outline focus:outline-2 focus:outline-blue-300' : 'border-transparent'} ${isDirty && hasError && 'outline outline-2 outline-red-300'} ${isDirty && !hasError && 'outline outline-2 outline-green-300'}`,
        className,
      ].join(' ')}
    />
  )
})

type TErrorProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode
}

const Error = ({ children, className, ...props }: TErrorProps) => {
  return (
    <span className={['text-red-500', className].join(' ')} {...props}>
      {children}
    </span>
  )
}

type TInfoProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode
}
const Info = ({ children, className, ...props }: TInfoProps) => {
  return (
    <span className={['text-neutral-500', className].join(' ')} {...props}>
      {children}
    </span>
  )
}

export const TextInput = Object.assign({}, { Input, Error, Info })
