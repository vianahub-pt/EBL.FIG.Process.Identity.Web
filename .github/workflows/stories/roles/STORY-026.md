---
id: STORY-026
title: "Importação em massa de papéis via CSV"
type: STORY
status: To do
resource: roles
endpoint: POST /v1/roles/bulk-upload
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-026 — Importação em massa de papéis via CSV

## Como utilizador com perfil Admin ou BackOffice
Eu quero importar múltiplos papéis via ficheiro CSV
Para que a criação em massa seja eficiente

## Endpoint
`POST /v1/roles/bulk-upload`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Roles | Action: BulkUpload

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

### Body (form-data)
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| file | IFormFile | Sim | Ficheiro CSV com os roles |

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
- **Então** os roles são importados e é exibido relatório

### CA-02: Sem ficheiro
- **Dado que** nenhum ficheiro é selecionado
- **Quando** tenta submeter
- **Então** é exibida mensagem de erro

## Cenários BDD

### Cenário 1: Import bem-sucedido
```gherkin
Given o admin seleciona um CSV de roles válido
When clica em "Importar"
Then os roles são criados e é exibido relatório
```

## Componentes Frontend Sugeridos
- `BulkUploadForm`, `UploadResultReport`, `useBulkUploadRoles`
