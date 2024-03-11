// import { Chip } from '@/components/ui/chip'
import { SearchBar } from './components/search-bar'
import { ProjectsService } from '@/services/project'
import { cookies } from 'next/headers'
import { cookieName } from '@/models/cookie'
import { StackedAvatar } from '@/components/ui/avatar/stacked-avatar'
import Link from 'next/link'
import { ClientRouting } from '@/models/routes/client'

export default async function ProjectPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()

  const cookie = cookieStore.get(cookieName)

  if (!cookie) return <NotFound />

  const { data, error } = await ProjectsService.getById(
    id,
    `${cookie.name}=${cookie.value}`
  )

  if (!data?.project || error) {
    console.log({ error })
    return <NotFound />
  }

  const { project } = data

  return (
    <div className="flex flex-col h-full w-full">
      <SearchBar />
      <header className="flex pr-5 mt-5">
        <section className="flex flex-col">
          <h1 className="text-3xl text-neutral-800 font-medium my-5">
            {project.name}
          </h1>
          <ul className="flex flex-col gap-6">
            <li className="">
              <StackedAvatar
                avatars={[
                  {
                    src: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
                    alt: 'test',
                  },
                  {
                    src: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
                    alt: 'test',
                  },
                  {
                    src: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
                    alt: 'test',
                  },
                  {
                    src: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
                    alt: 'test',
                  },
                ]}
                extraItem={
                  <Link
                    href={ClientRouting.projects().project(id).members()}
                    className="h-full w-full bg-blue-300 flex items-center justify-center text-sm hover:brightness-105 transition-colors duration-700"
                  >
                    +17
                  </Link>
                }
              />
            </li>
            <li className="grid [grid-template-columns:5rem_1fr]">
              <span className="text-neutral-600">Tags:</span>
              <ul className="flex gap-2">
                {/* {project.tags.map((tag, i) => ( */}
                {/*   <li key={i}> */}
                {/*     <Chip style={{ backgroundColor: tag.color }}> */}
                {/*       {tag.title} */}
                {/*     </Chip> */}
                {/*   </li> */}
                {/* ))} */}
                <li>
                  <span className="text-neutral-600">Add more</span>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section></section>
      </header>
    </div>
  )
}

function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      404 - project not found
    </div>
  )
}
