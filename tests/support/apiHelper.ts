import { APIRequestContext } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

export class WebhookApiHelper {
  private request: APIRequestContext;
  private endpointUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.endpointUrl = process.env.BASE_WEBHOOK_URL || 'http://localhost:5678/webhook/inove-workflow-v6/webhook/inove';
  }

  /**
   * Seta a base da requisição HTTP POST para o webhook da Evolution API
   * @param payload Payload completa da Evolution API (texto, imagem, áudio)
   */
  async triggerWebhook(payload: Record<string, any>) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (process.env.EVOLUTION_API_KEY) {
      headers['apikey'] = process.env.EVOLUTION_API_KEY;
    }

    return await this.request.post(this.endpointUrl, {
      data: payload,
      headers,
    });
  }
}
