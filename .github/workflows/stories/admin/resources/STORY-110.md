---
id: STORY-110
title: "Admin — Listar recursos de tenant/app com paginação"
type: STORY
status: To do
resource: admin/resources
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/resources/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-110 — Admin — Listar recursos de tenant/app com paginação

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/resources/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Read | RequireIdentityTenant

## Path + Query: tenantId, appId, search, isActive, page, pageSize

## Response

**Status:** 200 OK — `ListPageResponse<ResourceResponse>`

## Componentes Frontend Sugeridos
- `AdminResourceListPage`, `Pagination`, `useAdminGetResourcesPaged`
