'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// --- ACTIONS PARA FORNECEDORES ---

export async function getSuppliers() {
  return await prisma.supplier.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function addSupplier(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string

  if (!name || !phone) return

  await prisma.supplier.create({
    data: { name, phone }
  })

  revalidatePath('/fornecedores')
}

export async function deleteSupplier(id: string) {
  await prisma.supplier.delete({ where: { id } })
  revalidatePath('/fornecedores')
}

export async function toggleSupplierStatus(id: string, currentStatus: boolean) {
  await prisma.supplier.update({
    where: { id },
    data: { active: !currentStatus }
  })
  revalidatePath('/fornecedores')
}

// --- ACTIONS PARA DESTINOS ---

export async function getDestinations() {
  return await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function addDestination(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string

  if (!name || !phone) return

  await prisma.destination.create({
    data: { name, phone }
  })

  revalidatePath('/destinos')
}

export async function deleteDestination(id: string) {
  await prisma.destination.delete({ where: { id } })
  revalidatePath('/destinos')
}

export async function toggleDestinationStatus(id: string, currentStatus: boolean) {
  await prisma.destination.update({
    where: { id },
    data: { active: !currentStatus }
  })
  revalidatePath('/destinos')
}

export async function getMessageCountToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  try {
    const result = await prisma.messageLog.aggregate({
      _sum: {
        destinationsCount: true
      },
      where: {
        createdAt: {
          gte: today
        }
      }
    })

    return result._sum.destinationsCount || 0
  } catch (error) {
    console.error('Error fetching today count:', error)
    return 0
  }
}
