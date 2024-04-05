import { Bone } from '@/components/ui/bone'

export function CardSkeleton() {
  return (
    <article className="w-full flex justify-center">
      <section className="w-full flex items-center gap-2">
        <Bone className="w-10 h-10 rounded-full" />
        <section className="flex flex-col gap-1">
          <Bone className="w-36 h-3 rounded-full" />
          <Bone className="w-52 h-3 rounded-full" />
        </section>
      </section>
      <Bone className="w-20 px-4 h-10 rounded-xl" />
    </article>
  )
}
