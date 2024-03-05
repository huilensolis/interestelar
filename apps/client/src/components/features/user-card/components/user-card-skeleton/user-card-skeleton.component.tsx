import { Bone } from '@/components/ui/bone'

export function UserCardSkeleton() {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <Bone className="h-12 w-12 rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Bone className="h-5 w-28 rounded-full" />
        <Bone className="h-5 w-36 rounded-full" />
      </div>
    </div>
  )
}
