import { getSuppliers, getDestinations, getMessageCountToday } from '@/lib/actions'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [suppliers, destinations, messagesToday] = await Promise.all([
    getSuppliers(),
    getDestinations(),
    getMessageCountToday()
  ])

  return NextResponse.json({
    suppliers: suppliers.length,
    destinations: destinations.length,
    messagesToday
  })
}
