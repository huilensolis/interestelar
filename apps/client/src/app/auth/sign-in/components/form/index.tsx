'use client'

import { TextInput } from '@/components/ui/text-input'
import { useForm } from 'react-hook-form'
import type { TFormAreas } from './form.models'

export function SignInForm() {
  const { register, handleSubmit, formState, getFieldState } =
    useForm<TFormAreas>({ mode: 'onTouched' })

  const { errors } = formState

  function handleSignIn() {}
  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col gap-3 w-full max-w-96"
    >
      <TextInput
        placeholder="Email"
        {...register('email', {
          minLength: { value: 7, message: 'email is too short' },
          maxLength: { value: 100, message: 'email is too long' },
          required: 'email required',
          pattern: {
            value:
              // eslint-disable-next-line no-useless-escape
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'invalid email format',
          },
        })}
        isDirty={getFieldState('email', formState).isTouched}
        hasError={Boolean(errors.email?.message)}
      />
      <TextInput
        placeholder="password"
        {...register('password', {
          minLength: { value: 20, message: 'password is too short' },
          maxLength: { value: 100, message: 'password is too long' },
          required: 'password required',
        })}
        isDirty={getFieldState('password', formState).isTouched}
        hasError={Boolean(errors.password?.message)}
      />
    </form>
  )
}
