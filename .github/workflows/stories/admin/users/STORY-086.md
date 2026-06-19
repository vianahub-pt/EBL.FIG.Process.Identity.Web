---
id: STORY-086
title: "Admin — Listar utilizadores de um tenant com paginação"
type: STORY
status: To do
resource: admin/users
endpoint: GET /v1/admin/tenants/{tenantId}/users/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-086 — Admin — Listar utilizadores de um tenant com paginação

## Endpoint
`GET /v1/admin/tenants/{tenantId}/users/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| search | string | Não | Pesquisa |
| isActive | bool | Não | Filtrar por estado |
| page | int | Não | Página |
| pageSize | int | Não | Tamanho |

## Response

### Sucesso
**Status:** 200 OK
```json
{ "items": [...], "totalCount": 10, "page": 1, "pageSize": 10 }
```

## Componentes Frontend Sugeridos
- `AdminUserListPage`, `Pagination`, `useAdminGetUsersPaged`
