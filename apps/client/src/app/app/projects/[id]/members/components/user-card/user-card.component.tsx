import { Avatar } from '@/components/ui/avatar/signle'
import { type User } from '@/types/user'

export function UserCard({ user }: { user: User }) {
  return (
    <section className="flex items-center justify-start w-full gap-2">
      <Avatar src={`https://avatar.vercel.sh/${user.id}`} alt={user.username} />
      <section className="flex flex-col justify-center ">
        <h1 className="text-start leading-5 font-medium">{user.username}</h1>
        <span className="text-neutral-500 leading-5 text-sm">{user.email}</span>
      </section>
    </section>
  )
}
