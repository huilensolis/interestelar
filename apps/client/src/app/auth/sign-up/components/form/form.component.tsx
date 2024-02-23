'use client'

import { TextInput } from '@/components/ui/text-input'
import { useForm } from 'react-hook-form'
import type { TFormAreas } from './form.models'
import { useSession } from '@/hooks/use-session'
import { PrimaryButton } from '@/components/ui/button/primary/primary-button.component'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClientRouting } from '@/models/routes/client'

export function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [errorSigningUp, setErrorSigningUp] = useState(false)

  const { register, handleSubmit, formState, getFieldState } =
    useForm<TFormAreas>({ mode: 'onTouched' })

  const { errors } = formState

  const { signUp } = useSession()
  const router = useRouter()

  async function handleSignUp(data: TFormAreas) {
    setLoading(true)
    try {
      const { username, email, password } = data

      const { error } = await signUp({ username, email, password })
      if (error) {
        throw new Error('error signing up')
      }

      router.push(ClientRouting.app().home())
    } catch (error) {
      setErrorSigningUp(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex flex-col gap-3 w-full max-w-96"
    >
      <TextInput
        placeholder="Username"
        {...register('username', {
          minLength: { value: 4, message: 'Username is too short' },
          maxLength: { value: 20, message: 'Username is too long' },
          required: 'Username required',
          pattern: {
            value: /^[a-zA-Z0-9_-]+$/,
            message: 'The username should not contain symbols or operators.',
          },
        })}
        isDirty={getFieldState('username', formState).isTouched}
        hasError={Boolean(errors.username?.message)}
      />
      <TextInput
        placeholder="Email"
        {...register('email', {
          minLength: { value: 7, message: 'email is too short' },
          maxLength: { value: 50, message: 'email is too long' },
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
        type="password"
        placeholder="Password"
        {...register('password', {
          minLength: { value: 4, message: 'password is too short' },
          maxLength: { value: 40, message: 'password is too long' },
          pattern: {
            value: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message:
              'The password must have a Uppercase, lowercase letter and a number',
          },
          required: 'password required',
        })}
        isDirty={getFieldState('password', formState).isTouched}
        hasError={Boolean(errors.password?.message)}
      />
      <PrimaryButton
        loading={loading}
        disabled={loading || !formState.isValid}
        type="submit"
      >
        Sign Up
      </PrimaryButton>
      {errorSigningUp && (
        <span className="text-red-500">There is been an error signing up</span>
      )}
    </form>
  )
}
