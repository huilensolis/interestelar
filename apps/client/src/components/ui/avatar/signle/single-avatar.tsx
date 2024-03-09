import { type HTMLAttributes } from 'react'

type TProps = HTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

export function Avatar({ src, alt, className, ...props }: TProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={[
        'w-10 h-10 rounded-full border-2 border-gray-100 object-cover object-center',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
