import { Icon } from '@/components/ui/icon'
import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <nav className="flex items-center py-2 px-4 bg-stone-100 text-neutral-500 hover:text-neutral-700 transition-colors duration-75 cursor-pointer rounded-md w-full">
      <Icon icon={Search} className="text-neutral-800" />
      <span>Search</span>
    </nav>
  )
}
