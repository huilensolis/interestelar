import { Avatar } from '../signle'

type TImage = {
  src: string
  alt: string
}

export function StackedAvatar({
  avatars,
  extraItem,
}: {
  avatars: TImage[]
  extraItem?: React.JSX.Element
}) {
  return (
    <ul className="flex -space-x-4 rtl:space-x-reverse">
      {avatars.length > 0 &&
        avatars.map((avatar, i) => (
          <li key={i}>
            <Avatar src={avatar.src} alt={avatar.alt} />
          </li>
        ))}
      {extraItem && (
        <li className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100">
          {extraItem}
        </li>
      )}
    </ul>
  )
}
