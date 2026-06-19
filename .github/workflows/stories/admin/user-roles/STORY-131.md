---
id: STORY-131
title: "Admin — Listar roles de utilizador de tenant/app com paginação"
type: STORY
status: To do
resource: admin/user-roles
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-131 — Admin — Listar roles de utilizador de tenant/app com paginação

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: UserRoles | Action: Read | RequireIdentityTenant

## Path + Query: tenantId, appId, search, isActive, page, pageSize

## Response

**Status:** 200 OK — `ListPageResponse<UserRoleResponse>`

## Componentes Frontend Sugeridos
- `AdminUserRoleListPage`, `Pagination`, `useAdminGetUserRolesPaged`
