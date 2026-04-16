INSERT INTO "Supplier" (id, "name", phone, active, "createdAt", "updatedAt") 
VALUES (gen_random_uuid(), 'Fornecedor Teste', '5561984498130', true, NOW(), NOW()) 
ON CONFLICT (phone) DO NOTHING;

INSERT INTO "Destination" (id, "name", phone, active, "createdAt", "updatedAt") 
VALUES (gen_random_uuid(), 'Destino Teste', '5561984498130', true, NOW(), NOW()) 
ON CONFLICT (phone) DO NOTHING;
