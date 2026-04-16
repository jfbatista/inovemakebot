export const dynamic = 'force-dynamic'

import { getSuppliers, addSupplier, deleteSupplier, toggleSupplierStatus } from '@/lib/actions'
import { Plus, Trash2, Search, Phone, User as UserIcon } from 'lucide-react'

export default async function SuppliersPage() {
  const suppliers = await getSuppliers()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Fornecedores</h2>
          <p className="text-zinc-500 mt-1">Gerencie os contatos autorizados a enviar pedidos.</p>
        </div>
        
        <div className="flex gap-4">
           {/* Add Form (Simplified for now, will enhance later if needed) */}
           <form action={addSupplier} className="flex gap-3 bg-zinc-900/50 p-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 px-3 bg-zinc-900 rounded-lg border border-white/5">
                <UserIcon size={16} className="text-zinc-500" />
                <input 
                  name="name" 
                  placeholder="Nome do Fornecedor" 
                  className="bg-transparent border-none outline-none text-sm py-2 w-40"
                  required 
                />
              </div>
              <div className="flex items-center gap-2 px-3 bg-zinc-900 rounded-lg border border-white/5">
                <Phone size={16} className="text-zinc-500" />
                <input 
                  name="phone" 
                  placeholder="WhatsApp (Ex: 5511...)" 
                  className="bg-transparent border-none outline-none text-sm py-2 w-40"
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
              >
                <Plus size={18} />
                Adicionar
              </button>
           </form>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">WhatsApp</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <form action={async () => {
                    'use server'
                    await toggleSupplierStatus(supplier.id, supplier.active)
                  }}>
                    <button 
                      type="submit"
                      className={`w-10 h-5 rounded-full transition-colors relative ${supplier.active ? 'bg-blue-600' : 'bg-zinc-700'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${supplier.active ? 'left-6' : 'left-1'}`} />
                    </button>
                  </form>
                </td>
                <td className="px-6 py-4 font-medium">{supplier.name}</td>
                <td className="px-6 py-4 text-zinc-400 font-mono text-sm">{supplier.phone}</td>
                <td className="px-6 py-4 text-right">
                  <form action={async () => {
                    'use server'
                    await deleteSupplier(supplier.id)
                  }}>
                    <button className="text-zinc-500 hover:text-red-500 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-zinc-500 italic">
                  Nenhum fornecedor cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
