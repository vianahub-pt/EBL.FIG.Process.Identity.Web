---
id: STORY-074
title: "Importação em massa de tenants via CSV"
type: STORY
status: To do
resource: tenants
endpoint: POST /v1/tenants/bulk-upload
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-074 — Importação em massa de tenants via CSV

## Endpoint
`POST /v1/tenants/bulk-upload`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: BulkUpload

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
- **Então** tenants importados

## Componentes Frontend Sugeridos
- `BulkUploadForm`, `useBulkUploadTenants`
