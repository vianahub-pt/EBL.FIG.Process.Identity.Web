---
id: STORY-129
title: "Admin — Listar roles de utilizador de tenant/app"
type: STORY
status: To do
resource: admin/user-roles
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-129 — Admin — Listar roles de utilizador de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: UserRoles | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Response

**Status:** 200 OK — Array de `UserRoleResponse` (id, userName, roleName)

## Componentes Frontend Sugeridos
- `AdminUserRoleListPage`, `useAdminGetAllUserRoles`
