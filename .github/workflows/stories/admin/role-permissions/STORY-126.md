---
id: STORY-126
title: "Admin — Listar permissões de roles de tenant/app com paginação"
type: STORY
status: To do
resource: admin/role-permissions
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-126 — Admin — Listar permissões de roles de tenant/app com paginação

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: RolePermissions | Action: Read | RequireIdentityTenant

## Path + Query: tenantId, appId, search, isActive, page, pageSize

## Response

**Status:** 200 OK — `ListPageResponse<RolePermissionResponse>`

## Componentes Frontend Sugeridos
- `AdminRolePermissionListPage`, `Pagination`, `useAdminGetRolePermissionsPaged`
