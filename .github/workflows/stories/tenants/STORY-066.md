---
id: STORY-066
title: "Listar todos os tenants"
type: STORY
status: To do
resource: tenants
endpoint: GET /v1/tenants/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-066 — Listar todos os tenants

## Endpoint
`GET /v1/tenants/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Read

## Response

### Sucesso
**Status:** 200 OK
```json
[
  { "id": 1, "name": "Empresa Exemplo", "alias": "emp-exemplo", "isActive": true }
]
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Listagem bem-sucedida
- **Dado que** autenticado com permissão Tenants/Read
- **Quando** acede à lista
- **Então** vê todos os tenants com id, name, alias, isActive

## Componentes Frontend Sugeridos
- `TenantListPage`, `TenantTable`, `useGetAllTenants`
