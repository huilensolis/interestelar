import { type User } from '@/types/user'
import { InviteCollaborator } from './components/invite-collaborator'
import { UserCard } from './components/user-card'

export default function MembersPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const projectCollaborators: User[] = [
    {
      id: '9bf77e1b-f51a-4360-920d-e5568bd0a4dd',
      email: 'asdfasdf@gmail.com',
      username: 'huilensolis12ASDFASD',
      avatar: '/default-user.png',
      isActive: true,
      roles: ['user'],
    },
    {
      id: '486ebafd-0b75-4d62-9cad-c95a935dc6dd',
      email: 'a12asdf@gmail.com',
      username: 'huilensolis1233',
      avatar: '/default-user.png',
      isActive: true,
      roles: ['user'],
    },
    {
      id: 'f06f2125-ed03-439e-b73b-4e022b48d0cd',
      email: '123solis@skiff.com',
      username: 'huilensolis1234',
      avatar: '/default-user.png',
      isActive: true,
      roles: ['user'],
    },
    {
      id: '02a532fa-608e-4dca-b7ac-d08838f1f824',
      email: '123uilensolis@skiff.com',
      username: 'huilensolis123asdf',
      avatar: '/default-user.png',
      isActive: true,
      roles: ['user'],
    },
    {
      id: 'd515f409-fd78-440a-a636-6a84ae704b5b',
      email: 'huilensolis@gmail.com',
      username: 'huilensolis_test',
      avatar: '/default-user.png',
      isActive: true,
      roles: ['user'],
    },
    {
      id: '68fafa26-2f87-412c-a5da-5b1ea48fe963',
      email: 'asdfasdfasdf@gmail.com',
      username: 'huilendev',
      avatar: '/default-user.png',
      isActive: true,
      roles: ['user'],
    },
  ]

  const TABLE_COLUMNS: [string, string, string] = ['user', 'role', 'manage']

  return (
    <div className="flex flex-col items-center w-full h-full min-h-screen">
      <section className="flex items-center justify-start w-full">
        <h1 className="font-semibold text-3xl">Collaborators</h1>
        <InviteCollaborator />
      </section>
      <section className="w-full p-3 flex flex-col gap-2">
        <header className="w-full py-2 border-b border-b-neutral-300">
          <ul className="w-full grid grid-cols-3 items-center justify-center">
            {TABLE_COLUMNS.map((col, i) => (
              <li key={i}>{col}</li>
            ))}
          </ul>
        </header>
        <ul className="w-full flex flex-col">
          {projectCollaborators.map((user) => (
            <li
              key={user.id}
              className="hover:bg-neutral-200/30 py-3 border-b grid grid-cols-3 justify-center items-center"
            >
              <UserCard user={user} />
              {user.roles &&
                user.roles?.length !== 0 &&
                getHighestRole(user.roles)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function getHighestRole(roles: string[]) {
  const ORDERED_ROLES = ['admin', 'user'] // we order them from the heighest to the lowest role

  const firstRoleFound = roles.find((role, i) => role === ORDERED_ROLES[i])

  return firstRoleFound ?? 'user'
}
