export const dynamic = 'force-dynamic'

import { getSuppliers, getDestinations } from '@/lib/actions'
import { Users, Smartphone, MessageSquare, ShieldCheck } from 'lucide-react'

export default async function Home() {
  const suppliers = await getSuppliers()
  const destinations = await getDestinations()

  const stats = [
    { label: 'Fornecedores', value: suppliers.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Destinos', value: destinations.length, icon: Smartphone, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Encaminhamentos (Hoje)', value: 0, icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Resumo do Sistema</h2>
        <p className="text-zinc-500">Acompanhe o estado da sua automação de pedidos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-6 rounded-2xl flex items-center gap-5 border border-white/5 shadow-xl">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-zinc-500 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/20 text-blue-500 rounded-lg flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold">Fluxo de Trabalho</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-xs flex items-center justify-center flex-shrink-0 font-bold">1</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-white">Recebimento:</strong> O WhatsApp Bot recebe uma mensagem/arquivo de um fornecedor cadastrado.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-xs flex items-center justify-center flex-shrink-0 font-bold">2</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-white">Identificação:</strong> O n8n consulta nossa API para validar se o número é um fornecedor autorizado.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-xs flex items-center justify-center flex-shrink-0 font-bold">3</span>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-white">Broadcast:</strong> Se válido, o pedido é encaminhado para <span className="text-emerald-500 font-semibold">TODOS</span> os números de destino cadastrados.
              </p>
            </li>
          </ul>
        </div>

        <div className="glass p-8 rounded-2xl border border-white/5 bg-blue-600/[0.03] flex flex-col justify-center text-center space-y-4">
          <h3 className="text-xl font-bold">Status da Evolution API</h3>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="font-semibold text-emerald-500">Operacional</span>
          </div>
          <p className="text-zinc-500 text-sm">
            Pronto para receber mensagens. Certifique-se de que a instância do WhatsApp está conectada no Evolution API Dashboard.
          </p>
          <div className="pt-4">
            <button className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-xl text-sm transition-all border border-white/5">
              Ver Logs de Automação
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
