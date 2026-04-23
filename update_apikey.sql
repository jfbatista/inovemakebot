UPDATE workflow_entity 
SET nodes = CAST(REPLACE(CAST(nodes AS text), 'inove-token', '4224A8D3-5B5E-4B0F-8C7E-D9A3B5E0C2A1') AS json) 
WHERE id = 'inove-workflow-v6';
