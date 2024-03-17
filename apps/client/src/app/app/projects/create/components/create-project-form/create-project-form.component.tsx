'use client'

import { useForm } from 'react-hook-form'
import { type TCreateProjectFormAreas } from './create-project-form.models'
import { TextInput } from '@/components/ui/text-input'
import { PrimaryButton } from '@/components/ui/button/primary/primary-button.component'
import { useState } from 'react'
import { ProjectsService } from '@/services/project'
import { useRouter } from 'next/navigation'
import { ClientRouting } from '@/models/routes/client'

export function CreateNewProjectForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState, getFieldState } =
    useForm<TCreateProjectFormAreas>({
      mode: 'onChange',
    })

  const { errors, isValid } = formState

  const router = useRouter()

  async function createNewProject({ name }: TCreateProjectFormAreas) {
    if (!name) return

    try {
      setLoading(true)
      const { error, data } = await ProjectsService.create({ name })
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      if (error || !data) throw new Error('error creating project')

      setError(null)
      router.push(ClientRouting.projects().project(data.project.id).home())
    } catch (error) {
      setError('there is been an error trying to create the project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(createNewProject)}
      className="flex flex-col items-center justify-center gap-2"
    >
      <fieldset className="flex flex-col gap-2">
        <TextInput.Input
          {...register('name', {
            required: 'Project Name required',
            maxLength: { value: 70, message: 'Max Project Name length is 70' },
            minLength: { value: 1, message: 'Min Project Name length is 1' },
          })}
          placeholder="Name"
          hasError={Boolean(errors.name)}
          isDirty={getFieldState('name').isDirty}
        />
        {error && <TextInput.Error>{error}</TextInput.Error>}
      </fieldset>
      <PrimaryButton
        className="w-full"
        type="submit"
        disabled={!isValid || loading}
        loading={loading}
      >
        Create Project
      </PrimaryButton>
    </form>
  )
}
