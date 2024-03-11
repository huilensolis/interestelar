'use client'

import { useForm } from 'react-hook-form'
import { type TFormAreas } from './project-settings-form.models'
import { Avatar } from '@/components/ui/avatar/signle'
import { TextInput } from '@/components/ui/text-input'
import { useState } from 'react'
import { PrimaryButton } from '@/components/ui/button/primary/primary-button.component'
import editProjectDetails from './actions/edit-project-details'

export function ProjectSettingsForm({
  defaultValues,
  projectId,
}: {
  defaultValues: TFormAreas
  projectId: string
}) {
  const [projectNameInputValue, setProjectNameInputValue] = useState(
    defaultValues.name
  )
  const [errorOnSubmit, setErrorOnSubmit] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const { handleSubmit, register, formState, getFieldState } =
    useForm<TFormAreas>({
      mode: 'onChange',
      defaultValues,
    })

  const { errors, isValid, isValidating, isDirty } = formState

  async function handleFormSubmit(data: TFormAreas) {
    if (!data?.name) return

    try {
      setSubmitting(true)

      await editProjectDetails({ projectId, name: data.name })
    } catch (error) {
      console.log({ error })
      setErrorOnSubmit(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-center justify-center gap-2"
    >
      <section className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Avatar
            src={`https://avatar.vercel.sh/${projectNameInputValue || defaultValues.name}`}
            alt=""
          />

          <fieldset className="flex flex-col">
            <TextInput.Input
              {...register('name', {
                required: 'Project Name required',
                maxLength: {
                  value: 70,
                  message: 'Max Project Name length is 70',
                },
                minLength: {
                  value: 1,
                  message: 'Min Project Name length is 1',
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setProjectNameInputValue(e.target.value)
                },
              })}
              hasError={Boolean(errors.name)}
              isDirty={getFieldState('name').isDirty}
            />
            {errors.name && (
              <TextInput.Error>{errors.name.message}</TextInput.Error>
            )}
          </fieldset>
        </div>
      </section>
      <section className="flex flex-col w-full">
        <PrimaryButton
          type="submit"
          disabled={submitting || !isValid || !isDirty || isValidating}
          loading={submitting}
          className="w-full"
        >
          Update
        </PrimaryButton>
        {errorOnSubmit && (
          <span className="text-red-500">there has been an error</span>
        )}
      </section>
    </form>
  )
}
