import { Heading } from '@/components/ui/heading'
import { ProjectService } from '@/services/project'
import { getCookie } from '@/utils/cookie/get-cookie'
import { JoinProjectBtn } from './components/join-project-btn/join-project-btn.component'
import { RejectInvitationBtn } from './components/reject-invitation-btn/reject-invitation-btn.component'

export default async function InboxPage() {
  const { cookie } = getCookie()

  const { data, error } = await ProjectService.members.getUserInvitationList({
    ...(cookie && { cookie }),
  })

  return (
    <main className="flex flex-col gap-2">
      <header>
        <Heading>Invitations</Heading>
        <p>You have been invited to the following projects.</p>
      </header>
      <section className="w-full max-w-xl">
        {data && !error ? (
          <ul>
            {data.length > 0 &&
              data.map((project) => (
                <li key={project.id}>
                  <article className="flex justify-between w-full border-b border-b-neutral-300 pb-3">
                    <section className="flex flex-col">
                      <h1 className="font-medium text-lg">{project.name}</h1>
                      <p>here we will put the project members</p>
                    </section>
                    <section className="flex gap-2">
                      <JoinProjectBtn projectId={project.id} />
                      <RejectInvitationBtn />
                    </section>
                  </article>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-red-500">there has been an error</p>
        )}
      </section>
    </main>
  )
}
