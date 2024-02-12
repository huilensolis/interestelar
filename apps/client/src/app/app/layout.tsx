import { AsideNav } from '@/components/features/aside-nav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <AsideNav />
      {children}
    </div>
  )
}
