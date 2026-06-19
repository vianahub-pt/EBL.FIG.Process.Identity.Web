---
id: STORY-065
title: "Importação em massa de aplicações via CSV"
type: STORY
status: For Deploy
resource: apps
endpoint: POST /v1/apps/bulk-upload
priority: Medium
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/apps-crud
pr: "pending-push"
---

# STORY-065 — Importação em massa de aplicações via CSV

## Endpoint
`POST /v1/apps/bulk-upload`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: BulkUpload

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

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Nenhum ficheiro |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Upload bem-sucedido
- **Dado que** CSV válido selecionado
- **Quando** submete
- **Então** apps importadas

## Componentes Frontend Sugeridos
- `BulkUploadForm`, `useBulkUploadApps`
