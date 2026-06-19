---
id: STORY-125
title: "Admin — Obter permissão de role por ID de tenant/app"
type: STORY
status: To do
resource: admin/role-permissions
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-125 — Admin — Obter permissão de role por ID de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: RolePermissions | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 200 OK — `RolePermissionDetailResponse` (id, roleId, role, resourceId, resource, actionId, action)

## Componentes Frontend Sugeridos
- `AdminRolePermissionDetailPage`, `useAdminGetRolePermissionById`
