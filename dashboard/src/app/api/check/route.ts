import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ error: 'Telefone não informado' }, { status: 400 })
  }

  try {
    // 1. Normalizar o telefone (remover @s.whatsapp.net e caracteres não numéricos)
    const cleanPhone = phone.split('@')[0].replace(/\D/g, '')
    console.log(`[Validation] Received: ${phone}, Cleaned: ${cleanPhone}`)
    
    // Gerar variantes para lidar com o nono dígito brasileiro (DDI 55)
    const phoneVariants = [cleanPhone]
    
    if (cleanPhone.startsWith('55') && cleanPhone.length >= 12) {
      const ddd = cleanPhone.substring(2, 4)
      const rest = cleanPhone.substring(4)
      
      if (cleanPhone.length === 13 && rest.startsWith('9')) {
        // Variante sem o 9 extra: DDI (2) + DDD (2) + RESTO_SEM_O_PRIMEIRO_DIGITO
        phoneVariants.push(`55${ddd}${rest.substring(1)}`)
      } else if (cleanPhone.length === 12) {
        // Variante com o 9 extra: DDI (2) + DDD (2) + 9 + RESTO
        phoneVariants.push(`55${ddd}9${rest}`)
      }
    }
    
    console.log(`[Validation] Variants to check: ${phoneVariants.join(', ')}`)

    // 1. Verificar se o remetente é um fornecedor ativo usando as variantes
    const supplier = await prisma.supplier.findFirst({
      where: { 
        phone: { in: phoneVariants },
        active: true
      }
    })

    console.log(`[Validation] Match found: ${supplier ? supplier.name : 'NONE'}`)

    if (!supplier) {
      console.log(`[Validation] No active supplier found for variants: ${phoneVariants.join(', ')}`)
      return NextResponse.json({ 
        isSupplier: false, 
        destinations: [] 
      })
    }

    // 2. Buscar todos os destinos ativos para o broadcast
    const destinations = await prisma.destination.findMany({
      where: { active: true },
      select: { phone: true }
    })

    console.log(`[Validation] Found ${destinations.length} active destinations`)

    return NextResponse.json({
      isSupplier: true,
      supplierName: supplier.name,
      destinations: destinations.map(d => d.phone)
    })

  } catch (error) {
    console.error('Error in API Check:', error)
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 })
  }
}
