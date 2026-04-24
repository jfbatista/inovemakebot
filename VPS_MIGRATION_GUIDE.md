# Guia de Migração para VPS - InoveMakeBot

Este guia resume os comandos essenciais para subir e manter o seu sistema na VPS com a nova configuração de persistência.

## 1. Preparação na VPS

Após copiar os arquivos (`docker-compose.yml`, `.env`, pasta `automation`) para a VPS, execute:

```bash
# Entrar na pasta do projeto
cd /caminho/para/InoveMakeBot

# Subir os containers em modo daemon (segundo plano)
docker-compose up -d
```

## 2. Comandos Úteis de Manutenção

| Objetivo | Comando |
| :--- | :--- |
| **Ver Status** | `docker-compose ps` |
| **Ver Logs** | `docker-compose logs -f --tail=100` |
| **Reiniciar Tudo** | `docker-compose restart` |
| **Parar Sistema** | `docker-compose stop` |
| **Atualizar Imagens** | `docker-compose pull && docker-compose up -d` |

## 3. Backup de Dados (Volumes)

Os dados agora estão salvos em volumes nomeados do Docker. Para fazer backup manual dos dados no Linux:

```bash
# Localização padrão dos volumes no Linux
# (Requer privilégios de root)
sudo ls /var/lib/docker/volumes/
```

## 4. Importação do Workflow (Se necessário)

Se o n8n não carregar o fluxo automaticamente:
1. Acesse o n8n na porta `5678`.
2. Vá em **Workflows** -> **Import from File**.
3. Selecione o arquivo `automation/inove-workflow-v6-fixed.json`.

---
**Nota:** Lembre-se de atualizar o `SERVER_URL` e `N8N_WEBHOOK_URL` no arquivo `.env` da VPS com o novo endereço IP ou Domínio.
