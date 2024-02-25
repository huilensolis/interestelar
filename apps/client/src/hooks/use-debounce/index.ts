import { useEffect, useState } from 'react'

export function useDebounce<T>({ value, delay }: { value: T; delay: number }): {
  debouncedValue: T
} {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])

  return {
    debouncedValue,
  }
}
