'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DangerousButton } from '@/components/ui/button/dangerous'
import { TextInput } from '@/components/ui/text-input'
import { PlainButton } from '@/components/ui/button/plain'
import { type TFormAreas } from './delete-project-btn.models'

export function DeleteProjectBtn({ projectName }: { projectName: string }) {
  const [showDeleteAccordion, setShowDeleteAccordion] = useState<boolean>(false)

  const deleteProjectPhrase = 'Delete Project'

  const { handleSubmit, register, formState, getFieldState, reset } =
    useForm<TFormAreas>({ mode: 'all' })

  const { errors, isValid, isValidating, isDirty } = formState

  function closeDeleteAccordion() {
    reset()
    setShowDeleteAccordion(false)
  }

  function openDeleteAccordion() {
    setShowDeleteAccordion(true)
  }

  async function DeleteProject() {
    //
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <DangerousButton
        className="w-full"
        type="button"
        onClick={openDeleteAccordion}
        disabled={showDeleteAccordion}
      >
        Delete Project
      </DangerousButton>
      {showDeleteAccordion && (
        <form
          onSubmit={handleSubmit(DeleteProject)}
          className="flex flex-col gap-2"
        >
          <section className="flex flex-col gap-2">
            <fieldset>
              <TextInput.Info className="w-max flex">
                <p>
                  Enter the project name
                  <b className="font-bold"> &quot;{projectName}&quot;</b> to
                  continue:
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
                  <b className="font-bold">
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
          <fieldset className="flex justify-between">
            <PlainButton type="reset" onClick={closeDeleteAccordion}>
              Close
            </PlainButton>
            <DangerousButton disabled={!isValid || isValidating || !isDirty}>
              Delete
            </DangerousButton>
          </fieldset>
        </form>
      )}
    </div>
  )
}
