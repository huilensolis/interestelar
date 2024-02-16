import { Chip } from '@/components/ui/chip'
import { SearchBar } from './components/search-bar'

type TTag = {
  title: string
  color: string
}

export default function ProjectPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const project: { title: string; tags: TTag[] } = {
    title: id,
    tags: [
      { title: 'api', color: '#FFE6FA' },
      { title: 'database', color: '#FFE2E2' },
      { title: 'newsletter', color: '#E5F1FF' },
      { title: 'client', color: '#EEE5FF' },
    ],
  }

  return (
    <div className="flex flex-col pl-5 pt-5 pb-5 w-full">
      <SearchBar />
      <header className="flex pr-5 mt-5">
        <section className="flex flex-col">
          <h1 className="text-5xl text-neutral-800 font-medium my-5">
            ✨ {project.title}
          </h1>
          <ul className="flex flex-col gap-6">
            <li className="grid [grid-template-columns:5rem_1fr]">
              <span className="text-neutral-600">Deadline:</span>
              <span>{`${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</span>
            </li>
            <li className="grid [grid-template-columns:5rem_1fr]">
              <span className="text-neutral-600">Tags:</span>
              <ul className="flex gap-2">
                {project.tags.map((tag, i) => (
                  <li key={i}>
                    <Chip style={{ backgroundColor: tag.color }}>
                      {tag.title}
                    </Chip>
                  </li>
                ))}
                <li>
                  {' '}
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
