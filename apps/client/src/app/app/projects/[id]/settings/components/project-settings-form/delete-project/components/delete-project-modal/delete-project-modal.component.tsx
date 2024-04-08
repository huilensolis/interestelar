'use client'

import { useForm } from 'react-hook-form'

import { DangerousButton } from '@/components/ui/button/dangerous'
import { TextInput } from '@/components/ui/text-input'
import { type TFormAreas } from './delete-project-modal.models'
import { Icon } from '@/components/ui/icon'
import { Archive } from 'lucide-react'
import { ProjectService } from '@/services/project'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClientRouting } from '@/models/routes/client'

const DELETE_PROJECT_PHRASE = 'Delete Project'

export function DeleteProjectModal({
  projectName,
  projectId,
}: {
  projectName: string
  projectId: string
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false)

  const { handleSubmit, register, formState, getFieldState } =
    useForm<TFormAreas>({ mode: 'all' })

  const { errors, isValid, isValidating, isDirty } = formState

  const router = useRouter()

  async function DeleteProject() {
    setIsSubmitting(true)
    try {
      const { error } = await ProjectService.CRUD.delete(projectId)

      if (error)
        throw new Error('error submitting form trying to delete proejct')

      setErrorSubmitting(false)
      router.push(ClientRouting.app().home())
    } catch (error) {
      setErrorSubmitting(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(DeleteProject)}
      className="flex flex-col gap-2"
    >
      <section className="flex flex-col gap-2">
        <fieldset>
          <TextInput.Info className="w-max flex">
            <p>
              To continue, type
              <b className="font-semibold"> &quot;{projectName}&quot;</b>{' '}
            </p>
          </TextInput.Info>
          <TextInput.Input
            {...register('project_name', {
              required: 'area required',
              validate: (inputValue: string) => {
                if (inputValue !== projectName)
                  return 'project name does not match'
              },
            })}
            hasError={Boolean(errors.project_name)}
            isDirty={getFieldState('project_name').isDirty}
          />
          {errors.project_name && (
            <TextInput.Error className="flex">
              {errors.project_name?.message}
            </TextInput.Error>
          )}
        </fieldset>
        <fieldset>
          <TextInput.Info className="w-max flex">
            <p>
              To delete, type
              <b className="font-semibold">
                {' '}
                &quot;{DELETE_PROJECT_PHRASE}&quot;
              </b>
              .
            </p>
          </TextInput.Info>
          <TextInput.Input
            {...register('delete_my_project', {
              required: 'area required',
              validate: (inputValue: string) => {
                if (inputValue !== DELETE_PROJECT_PHRASE)
                  return 'phrase does not match'
              },
            })}
            hasError={Boolean(errors.delete_my_project)}
            isDirty={getFieldState('delete_my_project').isDirty}
          />
          {errors.delete_my_project && (
            <TextInput.Error className="flex">
              {errors.delete_my_project?.message}
            </TextInput.Error>
          )}
        </fieldset>
      </section>
      {errorSubmitting && (
        <TextInput.Error>
          There has been an error trying to delete the project
        </TextInput.Error>
      )}
      <fieldset className="flex justify-end items-center">
        <DangerousButton
          disabled={!isValid || isValidating || !isDirty || isSubmitting}
          className="flex items-center"
          loading={isSubmitting}
        >
          Delete <Icon icon={Archive} />
        </DangerousButton>
      </fieldset>
    </form>
  )
}
