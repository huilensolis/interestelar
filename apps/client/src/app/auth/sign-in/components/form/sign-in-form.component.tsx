'use client'

import { TextInput } from '@/components/ui/text-input'
import { useForm } from 'react-hook-form'
import type { TFormAreas } from './sign-in-form.models'
import { PrimaryButton } from '@/components/ui/button/primary/primary-button.component'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/use-session'
import { ClientRouting } from '@/models/routes/client'
import { useState } from 'react'

export function SignInForm() {
  const [loading, setLoading] = useState(false)
  const [errorSigningIn, setErrorSigningIn] = useState(false)

  const { register, handleSubmit, formState, getFieldState } =
    useForm<TFormAreas>({ mode: 'onTouched' })

  const { errors } = formState

  const { signIn } = useSession()
  const router = useRouter()

  async function handleSignIn(data: TFormAreas) {
    setLoading(true)
    try {
      const { email, password } = data

      const { error } = await signIn({ email, password })
      if (error) throw new Error('error signing in')

      router.push(ClientRouting.app().home())
    } catch (error) {
      setErrorSigningIn(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col gap-3 w-full max-w-96"
    >
      <div>
        <TextInput.Input
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
        {errors.email && (
          <TextInput.Error>{errors.email.message}</TextInput.Error>
        )}
      </div>
      <div>
        <TextInput.Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'password required',
          })}
          isDirty={getFieldState('password', formState).isTouched}
          hasError={Boolean(errors.password?.message)}
        />
        {errors.password && (
          <TextInput.Error>{errors.password.message}</TextInput.Error>
        )}
      </div>
      <PrimaryButton
        loading={loading}
        disabled={loading || !formState.isValid}
        type="submit"
      >
        Sign Up
      </PrimaryButton>
      {errorSigningIn && (
        <span className="text-red-500">There is been an error signing up</span>
      )}
    </form>
  )
}
