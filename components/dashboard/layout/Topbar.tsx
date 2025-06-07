// components/layout/Topbar.tsx
import { Bell, User } from 'lucide-react'

export const Topbar = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b bg-background">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />
        <User className="cursor-pointer" />
      </div>
    </header>
  )
}
