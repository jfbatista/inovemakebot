import urllib.request
import json
import sys

def send_test_message(phone="5561984498130", msg_type="text", msg_id="TEST_ID_123"):
    
    # Payload base simulando Evolution API v2 MESSAGES_UPSERT
    payload = {
        "event": "messages.upsert",
        "instance": "inove-teste",
        "data": {
            "key": {
                "remoteJid": f"{phone}@s.whatsapp.net",
                "fromMe": False,
                "id": msg_id
            },
            "pushName": "FORNECEDOR_TESTE",
            "message": {}
        },
        "date_time": "2026-04-18T12:00:00Z"
    }

    if msg_type == "text":
        payload["data"]["message"] = {
            "conversation": "Olá, esta é uma mensagem de teste de TEXTO."
        }
    elif msg_type == "image":
        payload["data"]["message"] = {
            "imageMessage": {
                "mimetype": "image/jpeg",
                "caption": "Teste de IMAGEM",
                "fileLength": "12345"
            }
        }
    elif msg_type == "audio":
        payload["data"]["message"] = {
            "audioMessage": {
                "mimetype": "audio/ogg; codecs=opus",
                "seconds": 5
            }
        }

    url = 'http://192.168.0.44:5678/webhook/inove'
    
    print(f"Enviando teste de {msg_type} para {url}...")
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )

    try:
        response = urllib.request.urlopen(req)
        print(f"Sucesso! Status: {response.status}")
        print(f"Resposta: {response.read().decode('utf-8')}")
    except Exception as e:
        print(f"Erro no envio: {str(e)}")

if __name__ == "__main__":
    # Testar texto por padrão
    tipo = sys.argv[1] if len(sys.argv) > 1 else "text"
    phone = sys.argv[2] if len(sys.argv) > 2 else "5561984498130"
    
    send_test_message(phone=phone, msg_type=tipo)
