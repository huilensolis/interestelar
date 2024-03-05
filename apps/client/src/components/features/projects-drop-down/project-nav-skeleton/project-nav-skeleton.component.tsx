import { Bone } from '@/components/ui/bone'

export function ProjectNavSkelenton() {
  return (
    <div className="flex items-center gap-2 px-1 py-2 w-full animate-pulse duration-300">
      <Bone className="rounded-full h-10 w-10 bg-gray-300" />
      <div className="flex flex-col gap-1 items-start h-full">
        <Bone className="w-14 h-5 rounded-full bg-gray-300" />
        <Bone className="w-40 h-5 rounded-full bg-gray-300" />
      </div>
    </div>
  )
}
