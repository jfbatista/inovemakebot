import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

export class WebhookPayloadFactory {
  /**
   * Cria um mock base com remetente, destino e configurações da instância.
   */
  static getBasePayload() {
    return {
      event: 'messages.upsert',
      instance: 'inove-teste',
      data: {
        key: {
          remoteJid: `${process.env.TEST_SUPPLIER_NUMBER || '5561984498130'}@s.whatsapp.net`,
          fromMe: false,
          id: `MOCK_${Date.now()}`,
        },
        pushName: 'Test Automator',
        messageTimestamp: Math.floor(Date.now() / 1000),
      },
      destination: process.env.TEST_DESTINATION_NUMBER || '5561984498130',
      sender: process.env.TEST_SUPPLIER_NUMBER || '5561984498130'
    };
  }

  /**
   * Payload mock para mensagem de texto.
   */
  static createTextMessage(text: string) {
    const base = this.getBasePayload();
    return {
      ...base,
      data: {
        ...base.data,
        messageType: 'conversation',
        message: {
          conversation: text
        }
      }
    };
  }

  /**
   * Payload mock para mensagem de mídia (Imagem vindo da Evolution API).
   */
  static createImageMessage(caption: string = '', url: string = 'http://example.com/test.jpg') {
    const base = this.getBasePayload();
    return {
      ...base,
      data: {
        ...base.data,
        messageType: 'imageMessage',
        message: {
          imageMessage: {
            url,
            mimetype: 'image/jpeg',
            caption
          }
        }
      }
    };
  }
}
