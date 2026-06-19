---
id: STORY-017
title: "Importação em massa de utilizadores via CSV"
type: STORY
status: To do
resource: users
endpoint: POST /v1/users/bulk-upload
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-017 — Importação em massa de utilizadores via CSV

## Como utilizador com perfil Admin ou BackOffice
Eu quero importar múltiplos utilizadores através de um ficheiro CSV
Para que o processo de criação em massa seja eficiente

## Endpoint
`POST /v1/users/bulk-upload`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Users | Action: BulkUpload

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

### Body (form-data)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| file | IFormFile | Sim | Ficheiro CSV com os utilizadores |

### Exemplo de Request
```
POST /v1/users/bulk-upload
Content-Type: multipart/form-data

[arquivo CSV]
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "success": true,
  "processedCount": 50,
  "errorCount": 2,
  "errors": ["Linha 3: email inválido", "Linha 7: nome obrigatório"]
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Nenhum ficheiro enviado ou formato inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Upload bem-sucedido
- **Dado que** o admin seleciona um ficheiro CSV válido
- **Quando** submete o formulário
- **Então** os utilizadores são importados e é exibido relatório de resultados

### CA-02: Sem ficheiro selecionado
- **Dado que** o admin tenta submeter sem selecionar ficheiro
- **Quando** clica em importar
- **Então** é exibida mensagem de erro "Nenhum arquivo foi enviado"

### CA-03: Ficheiro inválido
- **Dado que** o ficheiro enviado não está no formato correto
- **Quando** o upload é processado
- **Então** são exibidos os erros de validação por linha

## Cenários BDD

### Cenário 1: Importação bem-sucedida
```gherkin
Given o admin está na página de importação em massa
When seleciona um CSV válido e clica em "Importar"
Then os utilizadores são criados no sistema
And é exibido um relatório com o número de registos processados
```

### Cenário 2: Sem ficheiro
```gherkin
Given o admin está na página de importação
When clica em "Importar" sem selecionar ficheiro
Then é exibida mensagem "Nenhum arquivo foi enviado"
```

## Componentes Frontend Sugeridos
- `BulkUploadForm` — área de drag-and-drop ou input de ficheiro
- `UploadResultReport` — componente de exibição de resultados e erros
- `useBulkUploadUsers` — hook useMutation com FormData
- `CsvTemplateDownload` — link para download do template CSV

## Observações
- O Content-Type deve ser multipart/form-data (antiforgery desativado na API)
- Fornecer link para download do template CSV ao utilizador
