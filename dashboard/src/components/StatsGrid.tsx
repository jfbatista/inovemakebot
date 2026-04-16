'use client'

import { useState, useEffect } from 'react'
import { Users, Smartphone, MessageSquare } from 'lucide-react'

interface StatsGridProps {
  initialSuppliers: number
  initialDestinations: number
  initialMessagesToday: number
}

export default function StatsGrid({
  initialSuppliers,
  initialDestinations,
  initialMessagesToday
}: StatsGridProps) {
  const [stats, setStats] = useState({
    suppliers: initialSuppliers,
    destinations: initialDestinations,
    messagesToday: initialMessagesToday
  })

  useEffect(() => {
    // Conectar ao stream SSE
    const eventSource = new EventSource('/api/stats/stream')

    eventSource.onmessage = async (event) => {
      if (event.data === 'update') {
        console.log('Real-time update received!')
        // Buscar dados novos
        try {
          const res = await fetch('/api/stats')
          const data = await res.json()
          setStats(data)
        } catch (error) {
          console.error('Error fetching stats update:', error)
        }
      }
    }

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const items = [
    { 
      label: 'Fornecedores', 
      value: stats.suppliers, 
      icon: Users, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      label: 'Destinos', 
      value: stats.destinations, 
      icon: Smartphone, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-500/10' 
    },
    { 
      label: 'Encaminhamentos (Hoje)', 
      value: stats.messagesToday, 
      icon: MessageSquare, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10',
      animate: true
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((stat) => (
        <div key={stat.label} className="glass p-6 rounded-2xl flex items-center gap-5 border border-white/5 shadow-xl transition-all hover:scale-[1.02]">
          <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
            <stat.icon size={28} />
          </div>
          <div>
            <p className="text-zinc-500 font-medium">{stat.label}</p>
            <h3 className={`text-3xl font-bold transition-all duration-500 ${stat.animate ? 'animate-in fade-in zoom-in duration-700' : ''}`}>
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
