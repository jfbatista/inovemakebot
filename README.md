# InoveMakeBot

Sistema de automação de encaminhamento de mensagens WhatsApp integrando Evolution API, n8n e Dashboard Next.js.

## 🚀 Funcionalidades

- **Encaminhamento Inteligente**: Filtra mensagens de fornecedores específicos e encaminha para grupos de destinos automáticos.
- **Suporte a Mídia**: Suporta texto, áudio, imagens e documentos via Evolution API v2.
- **Analytics em Tempo Real**: Dashboard para acompanhamento de estatísticas de envio diário.
- **Ambiente Dockerizado**: Todo o stack roda em containers Docker com suporte a hot-reloading no Dashboard.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, Tailwind CSS, Lucide React.
- **Backend**: Next.js API Routes, Prisma ORM (v7).
- **Banco de Dados**: PostgreSQL.
- **Automação**: n8n.
- **WhatsApp**: Evolution API.

## 📦 Como Rodar

1. Clone o repositório.
2. Configure as variáveis de ambiente no `docker-compose.yml`.
3. Inicie os serviços:
   ```bash
   docker compose up -d
   ```
4. Sincronize o banco de dados do Dashboard:
   ```bash
   docker exec -it inove_dashboard npx prisma db push
   ```

## 📈 Monitoramento

O Dashboard consome logs enviados diretamente pelo workflow do n8n via endpoint `POST /api/logs`. Isso permite rastrear o volume de mensagens encaminhadas em tempo real.

## 🔧 Manutenção

- **Docker Watch**: Em ambiente de desenvolvimento, utilize o comando `docker compose watch` para que alterações no código do Dashboard sejam refletidas instantaneamente.
