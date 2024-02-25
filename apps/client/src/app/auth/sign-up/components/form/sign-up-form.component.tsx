'use client'

import { TextInput } from '@/components/ui/text-input'
import { useForm } from 'react-hook-form'
import type { TFormAreas } from './sign-up-form.models'
import { useSession } from '@/hooks/use-session'
import { PrimaryButton } from '@/components/ui/button/primary/primary-button.component'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClientRouting } from '@/models/routes/client'
import { useDebounce } from '@/hooks/use-debounce'
import { useUser } from '@/hooks/use-user'

export function SignUpForm() {
  const { register, handleSubmit, formState, getFieldState, setError } =
    useForm<TFormAreas>({ mode: 'onChange' })

  const { errors } = formState

  const [loading, setLoading] = useState(false)
  const [errorSigningUp, setErrorSigningUp] = useState(false)

  const [usernameValue, setUsernameValue] = useState<string>('')
  const [gmailValue, setGmailValue] = useState<string>('')

  const [isValidatingUsername, setIsValidatingUsername] = useState(false)
  const [isValidatingGmail, setIsValidatingGmail] = useState(false)

  const { debouncedValue: debouncedUsernameValue } = useDebounce({
    value: usernameValue,
    delay: 1000,
  })
  const { debouncedValue: debouncedGmailValue } = useDebounce({
    value: gmailValue,
    delay: 1000,
  })

  const { checkGmailAvailability, checkUsernameAvailability } = useUser()

  useEffect(() => {
    async function validateUsername() {
      const { error } = await checkUsernameAvailability(debouncedUsernameValue)
      if (error) {
        setError('username', {
          type: 'validate',
          message: 'Username already in use',
        })
      }
      setIsValidatingUsername(false)
    }

    if (debouncedUsernameValue.length > 0) {
      setIsValidatingUsername(true)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      validateUsername()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsernameValue])

  useEffect(() => {
    async function validateGmail() {
      const { error } = await checkGmailAvailability(debouncedGmailValue)
      if (error) {
        setError('email', {
          type: 'validate',
          message: 'gmail not available',
        })
      }
      setIsValidatingGmail(false)
    }

    if (debouncedGmailValue.length > 0) {
      setIsValidatingGmail(true)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      validateGmail()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGmailValue])

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
      <div>
        <TextInput.Input
          placeholder="Username"
          {...register('username', {
            minLength: { value: 4, message: 'username is too short' },
            maxLength: { value: 20, message: 'username is too long' },
            required: 'username required',
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: 'username cant contain symbols, spaces or operators.',
            },
            onChange(e: React.ChangeEvent<HTMLInputElement>) {
              setUsernameValue(e.target.value)
            },
          })}
          isDirty={getFieldState('username', formState).isTouched}
          hasError={Boolean(errors.username?.message)}
        />
        {isValidatingUsername && (
          <span className="text-neutral-700">validating username...</span>
        )}
        {errors.username && (
          <TextInput.Error>{errors.username.message}</TextInput.Error>
        )}
      </div>
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
            onChange(e: React.ChangeEvent<HTMLInputElement>) {
              setGmailValue(e.target.value)
            },
          })}
          isDirty={getFieldState('email', formState).isTouched}
          hasError={Boolean(errors.email?.message)}
        />
        {isValidatingGmail && (
          <span className="text-neutral-700">validating gmail...</span>
        )}
        {errors.email && (
          <TextInput.Error>{errors.email.message}</TextInput.Error>
        )}
      </div>
      <div>
        <TextInput.Input
          type="password"
          placeholder="Password"
          {...register('password', {
            minLength: { value: 4, message: 'password too short' },
            maxLength: { value: 40, message: 'password too long' },
            pattern: {
              value: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
              message:
                'password must have a uppercase, lowercase letter and a number',
            },
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
      {errorSigningUp && (
        <span className="text-red-500">There is been an error signing up</span>
      )}
    </form>
  )
}
