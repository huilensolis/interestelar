'use client'

import { useForm } from 'react-hook-form'

import { DangerousButton } from '@/components/ui/button/dangerous'
import { TextInput } from '@/components/ui/text-input'
import { type TFormAreas } from './delete-project-modal.models'
import { Icon } from '@/components/ui/icon'
import { Archive } from 'lucide-react'

export function DeleteProjectModal({ projectName }: { projectName: string }) {
  const deleteProjectPhrase = 'Delete Project'

  const { handleSubmit, register, formState, getFieldState } =
    useForm<TFormAreas>({ mode: 'all' })

  const { errors, isValid, isValidating, isDirty } = formState

  async function DeleteProject() {
    //
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
                &quot;{deleteProjectPhrase}&quot;
              </b>
              .
            </p>
          </TextInput.Info>
          <TextInput.Input
            {...register('delete_my_project', {
              required: 'area required',
              validate: (inputValue: string) => {
                if (inputValue !== deleteProjectPhrase)
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
      <fieldset className="flex justify-end items-center">
        <DangerousButton
          disabled={!isValid || isValidating || !isDirty}
          className="flex items-center"
        >
          Delete <Icon icon={Archive} />
        </DangerousButton>
      </fieldset>
    </form>
  )
}
