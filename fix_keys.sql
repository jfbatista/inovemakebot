UPDATE workflow_entity 
SET nodes = replace(nodes::text, '"value":"inove-token"', '"value":"4224A8D3-5B5E-4B0F-8C7E-D9A3B5E0C2A1"')::json 
WHERE id = 'inove-workflow-v6';
