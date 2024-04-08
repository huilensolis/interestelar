import { DashboardAside } from './components/dashboard-aside'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <div className="h-screen sticky top-0 border-r border-neutral-200 shadow-2xl shadow-gray-200 w-full max-w-80">
        <DashboardAside />
      </div>
      <div className="p-4 w-full">{children}</div>
    </div>
  )
}
