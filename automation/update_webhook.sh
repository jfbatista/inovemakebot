# Update Webhook in Evolution API
curl -X POST "http://localhost:8080/webhook/set/inove-teste" \
     -H "apikey: inove-token" \
     -H "Content-Type: application/json" \
     -d '{
       "url": "http://inove_n8n:5678/webhook/inove-bot",
       "enabled": true,
       "events": ["MESSAGES_UPSERT"]
     }'
