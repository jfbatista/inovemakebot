DELETE FROM "Webhook" WHERE "instanceId" IN (SELECT id FROM "Instance" WHERE "name" = 'inove-bot');
DELETE FROM "Session" WHERE "instanceId" IN (SELECT id FROM "Instance" WHERE "name" = 'inove-bot');
DELETE FROM "Setting" WHERE "instanceId" IN (SELECT id FROM "Instance" WHERE "name" = 'inove-bot');
DELETE FROM "Instance" WHERE "name" = 'inove-bot';
