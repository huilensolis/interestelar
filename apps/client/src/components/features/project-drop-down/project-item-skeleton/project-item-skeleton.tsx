import { Bone } from '@/components/ui/bone'

export function ProjectItemSkeleton() {
  return (
    <div className="flex items-center gap-2 px-1 py-2 w-full">
      <Bone className="rounded-full h-10 w-10" />
      <Bone className="w-40 h-6 rounded-full" />
    </div>
  )
}
