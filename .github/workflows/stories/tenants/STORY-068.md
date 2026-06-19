---
id: STORY-068
title: "Listar tenants com paginação"
type: STORY
status: To do
resource: tenants
endpoint: GET /v1/tenants/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-068 — Listar tenants com paginação

## Endpoint
`GET /v1/tenants/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Read

## Request

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| search | string | Não | Pesquisa por nome |
| isActive | bool | Não | Filtrar por estado |
| page | int | Não | Número da página |
| pageSize | int | Não | Tamanho da página |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "items": [{ "id": 1, "name": "Empresa Exemplo", "alias": "emp-exemplo", "isActive": true }],
  "totalCount": 5,
  "page": 1,
  "pageSize": 10
}
```

## Componentes Frontend Sugeridos
- `TenantListPage`, `Pagination`, `useGetTenantsPaged`
