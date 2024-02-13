import { ProjectsDropDown } from './components/projects-dropdown'

export async function AsideNav(): Promise<React.JSX.Element> {
  const PROJECTS: Array<{ emote: string; title: string; href: string }> = [
    {
      title: 'Screen Recorder',
      emote: '📸',
      href: '',
    },
    {
      title: 'Memoir',
      emote: '📓',
      href: '',
    },
    {
      title: 'Culinary Alchemy',
      emote: '🍜',
      href: '',
    },
    {
      title: 'Portfolio',
      emote: '🚀',
      href: '',
    },
  ]
  return (
    <aside className="flex flex-col gap-2 h-full min-h-screen bg-gray-100 w-full max-w-80 p-2">
      <header className="flex justify-between items-center py-4 border-b border-neutral-300 p-1">
        <section className="flex gap-2 items-center">
          <img
            src="https://i.pinimg.com/564x/57/a9/91/57a99101093e71ddacdf9639b5d579ea.jpg"
            alt="alt"
            className="w-10 h-full object-cover object-center rounded-md"
          />{' '}
          <h2 className="text-lg font-semibold">Memoir org</h2>
        </section>
      </header>
      <ul>
        <li>
          <ProjectsDropDown projects={PROJECTS} />
        </li>
      </ul>
    </aside>
  )
}
