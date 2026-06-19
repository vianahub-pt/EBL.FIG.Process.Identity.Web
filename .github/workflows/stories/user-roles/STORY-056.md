---
id: STORY-056
title: "Importação em massa de papéis de utilizador via CSV"
type: STORY
status: To do
resource: user-roles
endpoint: POST /v1/user-roles/bulk-upload
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-056 — Importação em massa de papéis de utilizador via CSV

## Endpoint
`POST /v1/user-roles/bulk-upload`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: UserRoles | Action: BulkUpload

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
| 400 | Bad Request | Nenhum ficheiro enviado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Upload bem-sucedido
- **Dado que** CSV válido é selecionado
- **Quando** submete
- **Então** atribuições são importadas

## Cenários BDD

### Cenário 1: Import
```gherkin
Given CSV válido de user-roles
When clica em "Importar"
Then atribuições são criadas
```

## Componentes Frontend Sugeridos
- `BulkUploadForm`, `useBulkUploadUserRoles`
