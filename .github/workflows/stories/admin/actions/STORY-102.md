---
id: STORY-102
title: "Admin — Listar ações de tenant/app com paginação"
type: STORY
status: To do
resource: admin/actions
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/actions/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-102 — Admin — Listar ações de tenant/app com paginação

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/actions/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Read | RequireIdentityTenant

## Request

### Path + Query Parameters
- tenantId (path), appId (path), search, isActive, page, pageSize (query)

## Response

**Status:** 200 OK — `ListPageResponse<ActionResponse>`

## Componentes Frontend Sugeridos
- `AdminActionListPage`, `Pagination`, `useAdminGetActionsPaged`
