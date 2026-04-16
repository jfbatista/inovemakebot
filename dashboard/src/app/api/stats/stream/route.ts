import { eventEmitter } from '@/lib/events'

export const dynamic = 'force-dynamic'

export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const onUpdate = () => {
        controller.enqueue(encoder.encode('data: update\n\n'))
      }

      eventEmitter.on('stats-update', onUpdate)

      // Keep-alive a cada 30 segundos
      const keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(': keep-alive\n\n'))
      }, 30000)

      // Limpeza quando a conexão fechar
      return () => {
        eventEmitter.off('stats-update', onUpdate)
        clearInterval(keepAlive)
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  })
}
