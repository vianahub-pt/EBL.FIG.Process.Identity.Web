---
id: STORY-057
title: "Listar todas as aplicações"
type: STORY
status: To do
resource: apps
endpoint: GET /v1/apps/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-057 — Listar todas as aplicações

## Endpoint
`GET /v1/apps/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Read

## Response

### Sucesso
**Status:** 200 OK
```json
[
  { "id": 1, "tenantId": 1, "name": "Portal RH", "isActive": true }
]
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Listagem bem-sucedida
- **Dado que** autenticado com permissão Apps/Read
- **Quando** acede à lista
- **Então** vê todas as apps com id, tenantId, name, isActive

## Cenários BDD

### Cenário 1: Listagem
```gherkin
Given autenticado com role Admin
When acede à lista de apps
Then vê todas as AppResponse
```

## Componentes Frontend Sugeridos
- `AppListPage`, `AppTable`, `useGetAllApps`
