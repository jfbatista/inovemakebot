-- Limpa tabelas de sessão e configurações para resetar o estado Baileys
TRUNCATE TABLE "Session" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Setting" RESTART IDENTITY CASCADE;
-- Remove instâncias específicas se existirem
DELETE FROM "Instance" WHERE name IN ('inove-bot', 'inove-bot-new');
