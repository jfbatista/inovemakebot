import { test, expect } from '@playwright/test';

const N8N_URL = process.env.N8N_URL || 'http://192.168.0.44:5678';
// URL confirmada como FUNCIONAL (200) nos testes anteriores
const WEBHOOK_PATH = '/webhook/inove-workflow-v6/webhook/inove';

test.describe('Agente de Teste - Validação Master', () => {
  
  test('Fluxo Completo - Simulação de Fornecedor enviando TESTE', async ({ request }) => {
    const response = await request.post(`${N8N_URL}${WEBHOOK_PATH}`, {
      data: {
        event: "messages.upsert",
        instance: "06664ecf-37c3-44ad-b11f-71342aee8a65",
        data: {
          key: {
            remoteJid: "556184498130@s.whatsapp.net",
            fromMe: true, // Garante que testamos o bypass do filtro
            id: "MASTER-TEST-001"
          },
          message: {
            conversation: "TESTE de fluxo automatizado"
          },
          sender: "556184498130@s.whatsapp.net"
        }
      }
    });
    
    console.log(`Webhook Status: ${response.status()}`);
    expect(response.status()).toBe(200);
  });

  test('Validação de Fornecedor - Lidar com 9o dígito', async ({ request }) => {
    const DASHBOARD_URL = 'http://192.168.0.44:3000';
    // Testamos o número exatamente como o Evolution envia (sem o 9)
    const response = await request.get(`${DASHBOARD_URL}/api/check?phone=556184498130`);
    const data = await response.json();
    console.log(`Dashboard check (sem 9): ${data.isSupplier}`);
    expect(data.isSupplier).toBe(true);
  });
});
