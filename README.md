# 🤖 InoveMakeBot

Sistema de automação para encaminhamento de mensagens WhatsApp de fornecedores para destinos configurados, usando **Evolution API**, **n8n** e um **Dashboard web** de gerenciamento.

---

## 📐 Arquitetura

```
WhatsApp (Fornecedor)
        │
        ▼
 Evolution API (v2) ──webhook──► n8n Workflow
                                      │
                              ┌───────┴────────┐
                              │ Valida Fornecedor│
                              │  (Dashboard API) │
                              └───────┬────────┘
                                      │
                              ┌───────┴────────┐
                              │ Busca Destinos  │
                              └───────┬────────┘
                                      │
                              ┌───────┴────────┐
                              │ Encaminha mídia │
                              │  (texto/áudio/  │
                              │  imagem/doc)    │
                              └───────┬────────┘
                                      │
                                      ▼
                            WhatsApp (Destino)
```

### Componentes

| Serviço | Container | Porta | Descrição |
|---------|-----------|-------|-----------|
| **Evolution API** | `inove_evolution` | `8080` | Gateway WhatsApp (Baileys) |
| **n8n** | `inove_n8n` | `5678` | Motor de automação/workflow |
| **Dashboard** | `inove_dashboard` | `3000` | Interface web de gerenciamento |
| **PostgreSQL** | `inove_postgres` | `5433` | Banco de dados principal |
| **Redis** | `inove_redis` | — | Cache da Evolution API |

---

## 🚀 Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados
- Git
- Node.js 20+ (só para desenvolvimento local do dashboard)

---

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/jfbatista/inovemakebot.git
cd inovemakebot
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e edite com suas configurações:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
# Banco de Dados
DB_USER=inove_user
DB_PASSWORD=TROQUE_POR_SENHA_FORTE
DB_NAME=inove_db
EVOLUTION_DB_NAME=evolution_db

# Evolution API
EVOLUTION_API_KEY=SEU_TOKEN_AQUI
SERVER_URL=http://SEU_IP:8080
EVOLUTION_INTERNAL_URL=http://inove_evolution:8080

# n8n
N8N_HOST=SEU_IP
N8N_PORT=5678
N8N_WEBHOOK_URL=http://SEU_IP:5678
INSTANCE_NAME=inove-bot

# Dashboard
NEXTAUTH_SECRET=GERE_COM_openssl_rand_hex_32
NEXT_PUBLIC_API_URL=http://inove_dashboard:3000
```

> ⚠️ **Nunca suba o `.env` real para o repositório**. Use `.env.example` como template.

### 3. Suba os containers

```bash
docker compose up -d
```

### 4. Conecte o WhatsApp

Acesse `http://SEU_IP:8080/manager` para escanear o QR Code da instância.

---

## 📱 Funcionalidades

### Tipos de mensagens suportadas

| Tipo | Código | Suporte |
|------|--------|---------|
| Texto | `conversation` | ✅ |
| Texto estendido | `extendedTextMessage` | ✅ |
| Áudio / PTT | `audioMessage` | ✅ |
| Imagem | `imageMessage` | ✅ |
| Vídeo | `videoMessage` | ✅ |
| Documento | `documentMessage` | ✅ |
| Sticker | `stickerMessage` | ✅ (convertido para imagem) |
| Documento c/ legenda | `documentWithCaptionMessage` | ✅ |

### Fluxo do n8n

1. **Evolution API Webhook** — Recebe eventos `messages.upsert`
2. **Mensagem Propria?** — Extrai telefone, detecta tipo de mídia, lê base64
3. **Validar Fornecedor** — Consulta Dashboard API (`GET /api/check?phone=...`)
4. **E Fornecedor?** — Bifurca: processa só se for fornecedor cadastrado
5. **Lista de Destinos** — Expande os destinos (splitOut)
6. **Preparar Envios** — Monta payload para Evolution API (texto + mídia)
7. **Encaminhar Mensagem** — Envia via `sendText` ou `sendMedia`

---

## 🖥️ Dashboard

Interface web para gerenciar **Fornecedores** e **Destinos**.

- **Fornecedores**: números WhatsApp autorizados a usar o bot
- **Destinos**: números que recebem as mensagens encaminhadas

### Acesso

```
http://SEU_IP:3000
```

### Tecnologias

- **Next.js 16** (App Router)
- **Prisma ORM** (PostgreSQL)
- **Tailwind CSS v4**
- **TypeScript**

---

## 🗄️ Banco de Dados

### Schema principal (Dashboard)

```prisma
model Supplier {
  id        String   @id @default(uuid())
  name      String
  phone     String   @unique   // Formato: 5561999999999
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Destination {
  id        String   @id @default(uuid())
  name      String
  phone     String   @unique
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🔄 Manutenção

### Ver logs

```bash
# Todos os serviços
docker compose logs -f

# Específico
docker compose logs -f inove_n8n
docker compose logs -f inove_evolution
```

### Reiniciar serviços

```bash
docker compose restart inove_n8n
```

### Parar tudo

```bash
docker compose down
```

### Backup do banco

```bash
docker exec inove_postgres pg_dump -U inove_user inove_db > backup.sql
```

---

## 🛠️ Desenvolvimento

### Rodar o dashboard localmente

```bash
cd dashboard
cp .env.example .env.local
# Configure DATABASE_URL no .env.local
npm install
npm run dev
```

### Simular webhook (teste sem WhatsApp)

```bash
python simulate_webhook.py
```

---

## 📁 Estrutura do Projeto

```
inovemakebot/
├── docker-compose.yml          # Orquestração dos containers
├── .env.example                # Template de variáveis de ambiente
├── init-db.sql                 # Script de inicialização do banco
├── simulate_webhook.py         # Ferramenta de teste de webhooks
├── dashboard/                  # Aplicação web (Next.js)
│   ├── src/
│   │   ├── app/                # Rotas (App Router)
│   │   │   ├── api/check/      # Endpoint de validação de fornecedor
│   │   │   ├── fornecedores/   # CRUD de fornecedores
│   │   │   └── destinos/       # CRUD de destinos
│   │   ├── components/         # Componentes UI reutilizáveis
│   │   └── lib/                # Prisma client, actions, utils
│   ├── prisma/
│   │   └── schema.prisma       # Schema do banco de dados
│   └── Dockerfile              # Build de produção do dashboard
└── automation/                 # Arquivos auxiliares do n8n
```

---

## 🔐 Segurança

- Troque `EVOLUTION_API_KEY` por um UUID gerado aleatoriamente
- Use senhas fortes para o banco de dados
- Nunca exponha as portas 5432/5678 diretamente na internet sem firewall
- O arquivo `.env` está no `.gitignore` — nunca o commite

---

## 📖 Referências

- [Evolution API Docs](https://doc.evolution-api.com)
- [n8n Docs](https://docs.n8n.io)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
