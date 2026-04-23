-- Limpar registros incorretos e garantir o correto
DELETE FROM public."Supplier" WHERE "phone" = '556184498130';
-- Garantir que o fornecedor correto está ativo
UPDATE public."Supplier" SET "active" = true WHERE "phone" = '5561984498130';
-- Garantir que o destino correto está ativo
UPDATE public."Destination" SET "active" = true WHERE "phone" = '5561984498130';
