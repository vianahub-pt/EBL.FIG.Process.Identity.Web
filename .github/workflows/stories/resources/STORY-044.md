---
id: STORY-044
title: "Importação em massa de recursos via CSV"
type: STORY
status: To do
resource: resources
endpoint: POST /v1/resources/bulk-upload
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-044 — Importação em massa de recursos via CSV

## Endpoint
`POST /v1/resources/bulk-upload`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: BulkUpload

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

### Body (form-data)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| file | IFormFile | Sim | Ficheiro CSV |

## Response

### Sucesso
**Status:** 200 OK
```json
{ "success": true }
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Nenhum ficheiro enviado |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Upload bem-sucedido
- **Dado que** CSV válido é selecionado
- **Quando** submete
- **Então** recursos são importados

## Cenários BDD

### Cenário 1: Import
```gherkin
Given CSV válido de recursos selecionado
When clica em "Importar"
Then recursos são criados
```

## Componentes Frontend Sugeridos
- `BulkUploadForm`, `UploadResultReport`, `useBulkUploadResources`
