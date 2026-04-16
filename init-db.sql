-- Criação de bancos de dados adicionais
SELECT 'CREATE DATABASE evolution_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'evolution_db')\gexec

SELECT 'CREATE DATABASE inove_n8n_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'inove_n8n_db')\gexec

-- Dar permissões se necessário (opcional se for o mesmo user dono)
-- GRANT ALL PRIVILEGES ON DATABASE evolution_db TO inove_user;
-- GRANT ALL PRIVILEGES ON DATABASE inove_n8n_db TO inove_user;
