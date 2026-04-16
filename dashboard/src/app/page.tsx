export const dynamic = 'force-dynamic'

import { getSuppliers, getDestinations, getMessageCountToday } from '@/lib/actions'
import { ShieldCheck } from 'lucide-react'
import StatsGrid from '@/components/StatsGrid'

export default async function Home() {
  const suppliers = await getSuppliers()
  const destinations = await getDestinations()
  const messagesToday = await getMessageCountToday()

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Resumo do Sistema</h2>
        <p className="text-zinc-500">Acompanhe o estado da sua automação de pedidos.</p>
      </div>

      <StatsGrid 
        initialSuppliers={suppliers.length} 
        initialDestinations={destinations.length}
        initialMessagesToday={messagesToday}
      />

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
