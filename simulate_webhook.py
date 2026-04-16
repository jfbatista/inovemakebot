import urllib.request
import json

payload = {
      "event": "messages.upsert",
      "instance": "inove-teste",
      "data": {
        "key": {
          "remoteJid": "556192975515@s.whatsapp.net",
          "remoteJidAlt": "556192975515@s.whatsapp.net",
          "fromMe": False,
          "id": "A502128694835EF5D0D0848EFEACA7F1_TEST",
          "participant": "",
          "addressingMode": "lid"
        },
        "pushName": "Marcos Ribeiro (Teste Auto)",
        "status": "DELIVERY_ACK",
        "message": {
          "audioMessage": {
            "mimetype": "audio/ogg; codecs=opus",
            "seconds": 1,
            "ptt": True
          },
          "base64": "UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJaQAA3AA/v3QgAA="
        }
      },
      "destination": "http://inove_n8n:5678/webhook/webhook-inove",
      "date_time": "2026-04-15T21:40:51.496Z",
      "sender": "556184498130@s.whatsapp.net",
      "server_url": "http://inove_evolution:8080",
      "apikey": "inove-token"
}

req = urllib.request.Request(
    'http://localhost:5678/webhook/webhook-inove',
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    response = urllib.request.urlopen(req)
    print(f"Status: {response.status}")
    print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {str(e)}")
