---
id: STORY-094
title: "Admin — Listar apps de um tenant com paginação"
type: STORY
status: To do
resource: admin/apps
endpoint: GET /v1/admin/tenants/{tenantId}/apps/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-094 — Admin — Listar apps de um tenant com paginação

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Read | RequireIdentityTenant

## Request

### Path Parameters + Query Parameters
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| tenantId (path) | int | ID do tenant |
| search (query) | string | Pesquisa |
| isActive (query) | bool | Filtro estado |
| page (query) | int | Página |
| pageSize (query) | int | Tamanho |

## Response

**Status:** 200 OK — `ListPageResponse<AppResponse>`

## Componentes Frontend Sugeridos
- `AdminAppListPage`, `Pagination`, `useAdminGetAppsPaged`
