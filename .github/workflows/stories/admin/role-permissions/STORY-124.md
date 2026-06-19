---
id: STORY-124
title: "Admin — Listar permissões de roles de tenant/app"
type: STORY
status: To do
resource: admin/role-permissions
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-124 — Admin — Listar permissões de roles de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: RolePermissions | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Response

**Status:** 200 OK — Array de `RolePermissionResponse` (id, role, resource, action)

## Componentes Frontend Sugeridos
- `AdminRolePermissionListPage`, `useAdminGetAllRolePermissions`
