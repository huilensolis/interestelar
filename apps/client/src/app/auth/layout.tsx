import { ClientRouting } from '@/models/routes/client'
import { protectResourceFromAuthenticatedUsers } from '@/utils/guards/auth/auth'
import Link from 'next/link'
import type { ReactNode } from 'react'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  await protectResourceFromAuthenticatedUsers()
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center xl:p-4">
      <article className="grid grid-cols-1 xl:grid-cols-2 grid-rows-1 xl:grid-rows-1 w-full items-center xl:max-w-[1922px] h-screen xl:h-full max-h-screen xl:max-h-[1200px]">
        <section className="flex flex-col w-full h-full">
          <header>
            <nav className="p-4">
              <ul className="flex gap-2 w-full justify-end">
                <li>
                  <Link
                    href={ClientRouting.auth().signIn()}
                    className="text-neutral-600 hover:text-neutral-500 transition-colors duration-75 px-3 py-1 rounded-md font-medium"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href={ClientRouting.auth().signUp()}
                    className="text-neutral-600 bg-neutral-100 hover:brightness-95 transition-colors duration-75 px-3 py-1 rounded-md font-medium"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="h-full">{children}</main>
        </section>
        <section className="xl:flex hidden w-full h-full">
          <Aside />
        </section>
      </article>
    </div>
  )
}

function Aside(): React.JSX.Element {
  return (
    <article className="h-full w-full relative rounded-sm overflow-hidden">
      <img
        src="https://cdn.dribbble.com/userupload/12793873/file/original-5cc23fe9b782d345c7009c851edf3652.png?resize=1024x768"
        width={640}
        height={900}
        alt="dark gradient"
        className="w-full h-full object-cover object-center"
      />
      <span className="absolute bottom-0 right-0 p-4 backdrop-blur w-full">
        image by{' '}
        <a
          className="text-blue-500 hover:underline"
          href="https://dribbble.com/shots/23553375-CTASK-Project-Task-Management-Dashboard"
        >
          F. Ferina Chung
        </a>
        <br />
        This image will be replaced with a real one as the app development
        advances
      </span>
    </article>
  )
}
