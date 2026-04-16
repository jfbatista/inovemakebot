import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { supplierPhone, type, destinationsCount } = body

    if (!supplierPhone) {
      return NextResponse.json({ error: 'Missing supplierPhone' }, { status: 400 })
    }

    const log = await prisma.messageLog.create({
      data: {
        supplierPhone,
        type: type || 'text',
        destinationsCount: Number(destinationsCount) || 0
      }
    })

    return NextResponse.json(log)
  } catch (error) {
    console.error('Error creating log:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
