import { test, expect } from '@playwright/test';
import { WebhookApiHelper } from '../support/apiHelper';
import { WebhookPayloadFactory } from '../support/factories';

test.describe('InoveMakeBot Evolution API Webhook -> n8n', () => {

  let apiHelper: WebhookApiHelper;

  test.beforeEach(async ({ request }) => {
    // Inicializamos o Helper de forma encapsulada no request state do Playwright
    apiHelper = new WebhookApiHelper(request);
  });

  test('Deve processar mensagem de texto e retornar HTTP 200 do n8n', async () => {
    // Action / Act
    const textPayload = WebhookPayloadFactory.createTextMessage('Teste Automatizado Playwright de API!');
    const response = await apiHelper.triggerWebhook(textPayload);
    
    // Assertion / Assert
    expect(response.status()).toBe(200);
    // Verificar se o corpo também sinaliza um sucesso caso haja padronização no n8n.
    // Opcionalmente podemos ler const body = await response.json(); 
  });

  test('Deve processar mensagem de mídia (Imagem) e retornar HTTP 200 do n8n', async () => {
    // Action / Act
    const imagePayload = WebhookPayloadFactory.createImageMessage('Imagem anexada do Teste Automatizado', 'http://some-fake-url.com/img.jpg');
    const response = await apiHelper.triggerWebhook(imagePayload);

    // Assertion / Assert
    expect(response.status()).toBe(200);
  });
});
