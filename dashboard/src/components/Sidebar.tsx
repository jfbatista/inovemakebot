'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Smartphone, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Fornecedores', href: '/fornecedores', icon: Users },
  { label: 'Destinos', href: '/destinos', icon: Smartphone },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-screen glass border-r border-white/5 flex flex-col p-6 fixed left-0 top-0">
      <div className="mb-10 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
          I
        </div>
        <h1 className="text-xl font-bold tracking-tight">InoveMake<span className="text-blue-500">Bot</span></h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? 'active' : 'text-zinc-500 hover:text-white'}`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-6 border-t border-white/5">
        <button className="nav-link text-zinc-500 hover:text-white w-full">
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </button>
      </div>
    </div>
  )
}
