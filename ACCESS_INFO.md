# 🗝️ Informações de Acesso - InoveMakeBot

Este arquivo contém os links e credenciais necessários para gerenciar o ambiente **InoveMakeBot**. Guarde estas informações em local seguro.

## 🤖 n8n (Automação)
- **URL Local:** [http://localhost:5678](http://localhost:5678)
- **URL Externa:** [http://192.168.0.44:5678](http://192.168.0.44:5678)
- **Usuário Proprietário:** `inove@example.com`
- **Senha:** *Configurada durante o primeiro acesso (não armazenada no .env por segurança).*

## 📲 Evolution API (WhatsApp)
- **URL:** [http://localhost:8080](http://localhost:8080)
- **API Key:** `4224A8D3-5B5E-4B0F-8C7E-D9A3B5E0C2A1`
- **Webhook Endpoint:** `http://inove_n8n:5678/webhook/webhook-inove-bot`
- **Instância de Teste:** `inove-teste`

## 📊 Dashboard & Banco de Dados (PostgreSQL)
- **Dashboard URL:** [http://localhost:3000](http://localhost:3000)
- **Database User:** `inove_user`
- **Database Password:** `inove_pass_change_me`
- **Database Name:** `inove_db` (Dashboard) / `evolution_db` (API) / `inove_n8n_db` (n8n)

## 🛠️ Comandos Úteis
- **Reiniciar tudo:** `docker-compose restart`
- **Logs em tempo real:** `docker-compose logs -f`
- **Executar Simulação:** `python simulate_webhook.py`

---
> [!WARNING]
> Nunca compartilhe estas chaves ou senhas em repositórios públicos. O arquivo `.env` deve ser mantido no `.gitignore`.
