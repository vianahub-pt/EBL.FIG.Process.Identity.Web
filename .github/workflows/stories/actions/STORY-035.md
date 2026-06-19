---
id: STORY-035
title: "Importação em massa de ações via CSV"
type: STORY
status: For Deploy
resource: actions
endpoint: POST /v1/actions/bulk-upload
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-p
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-035 — Importação em massa de ações via CSV

## Como utilizador com perfil Admin ou BackOffice
Eu quero importar múltiplas ações via CSV

## Endpoint
`POST /v1/actions/bulk-upload`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Actions | Action: BulkUpload

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

### Body (form-data)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| file | IFormFile | Sim | Ficheiro CSV com as ações |

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
- **Dado que** o admin seleciona um CSV válido
- **Quando** submete
- **Então** as ações são importadas

## Cenários BDD

### Cenário 1: Import bem-sucedido
```gherkin
Given CSV de ações válido selecionado
When clica em "Importar"
Then as ações são criadas e relatório é exibido
```

## Componentes Frontend Sugeridos
- `BulkUploadForm`, `UploadResultReport`, `useBulkUploadActions`
