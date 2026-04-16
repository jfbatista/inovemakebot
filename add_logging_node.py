import subprocess, json, uuid

WF = "jTHLJs0ygTsJaf1q"

def psql(sql):
    r = subprocess.run(["docker","exec","inove_postgres","psql","-U","inove_user","-d","inove_n8n_db","-t","-A","-c",sql], capture_output=True, text=True)
    if r.returncode != 0:
        print(f"ERROR: {r.stderr}")
        return None
    return r.stdout.strip()

print("Buscando workflow...")
raw_nodes = psql(f"SELECT nodes::text FROM workflow_entity WHERE id='{WF}'")
raw_conn  = psql(f"SELECT connections::text FROM workflow_entity WHERE id='{WF}'")

if not raw_nodes or not raw_conn:
    print("Erro ao buscar workflow.")
    exit(1)

nodes = json.loads(raw_nodes)
conn  = json.loads(raw_conn)

# 1. Adicionar o nó Registrar Log
log_node = {
    "parameters": {
        "method": "POST",
        "url": "={{ $env.NEXT_PUBLIC_API_URL }}/api/logs",
        "sendBody": True,
        "specifyHeaders": True,
        "headerParameters": {
            "parameters": [
                {
                    "name": "Content-Type",
                    "value": "application/json"
                }
            ]
        },
        "bodyParameters": {
            "parameters": [
                {
                    "name": "supplierPhone",
                    "value": "={{ $node[\"Mensagem Propria?\"].json[\"_phone\"] }}"
                },
                {
                    "name": "destinationsCount",
                    "value": "1"
                },
                {
                    "name": "type",
                    "value": "={{ $node[\"Mensagem Propria?\"].json[\"_message\"] === \"[Midia/Outro]\" ? \"media\" : \"text\" }}"
                }
            ]
        },
        "options": {}
    },
    "id": str(uuid.uuid4())[:8],
    "name": "Registrar Log",
    "type": "n8n-nodes-base.httpRequest",
    "typeVersion": 4.1,
    "position": [1350, 200]
}

# Evitar duplicatas
if any(n["name"] == "Registrar Log" for n in nodes):
    print("Nó 'Registrar Log' já existe. Atualizando...")
    nodes = [n for n in nodes if n["name"] != "Registrar Log"]

nodes.append(log_node)

# 2. Conectar Encaminhar Mensagem -> Registrar Log
if "Encaminhar Mensagem" not in conn:
    conn["Encaminhar Mensagem"] = {"main": [[]]}

# Adicionar conexão se não existir
exists = False
for c_list in conn["Encaminhar Mensagem"]["main"]:
    for target in c_list:
        if target["node"] == "Registrar Log":
            exists = True
if not exists:
    conn["Encaminhar Mensagem"]["main"][0].append({
        "node": "Registrar Log",
        "type": "main",
        "index": 0
    })

# 3. Salvar no Banco
nodes_json = json.dumps(nodes).replace("'", "''")
conn_json  = json.dumps(conn).replace("'", "''")
vid = str(uuid.uuid4())

print(f"Inserindo nova versão histórico: {vid}")
psql(f"INSERT INTO workflow_history (\"versionId\",\"workflowId\",authors,nodes,connections,\"createdAt\",\"updatedAt\",name,autosaved) VALUES ('{vid}','{WF}','caveman-logging-fix','{nodes_json}'::json,'{conn_json}'::json,NOW(),NOW(),'Inove WhatsApp Bot',false)")

print("Relacionando versão ativa...")
psql(f"UPDATE workflow_published_version SET \"publishedVersionId\"='{vid}',\"updatedAt\"=NOW() WHERE \"workflowId\"='{WF}'")
psql(f"UPDATE workflow_entity SET \"activeVersionId\"='{vid}',\"versionId\"='{vid}',nodes='{nodes_json}'::json, connections='{conn_json}'::json, \"updatedAt\"=NOW() WHERE id='{WF}'")

print(f"Sucesso! Workflow atualizado com logging (ID: {WF}, Versao: {vid})")
