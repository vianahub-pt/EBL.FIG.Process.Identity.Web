---
id: STORY-118
title: "Admin — Listar roles de tenant/app com paginação"
type: STORY
status: To do
resource: admin/roles
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/roles/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-118 — Admin — Listar roles de tenant/app com paginação

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/roles/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Read | RequireIdentityTenant

## Path + Query: tenantId, appId, search, isActive, page, pageSize

## Response

**Status:** 200 OK — `ListPageResponse<RoleResponse>`

## Componentes Frontend Sugeridos
- `AdminRoleListPage`, `Pagination`, `useAdminGetRolesPaged`
