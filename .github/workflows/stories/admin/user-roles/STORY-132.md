---
id: STORY-132
title: "Admin — Associar role a utilizador em tenant/app"
type: STORY
status: To do
resource: admin/user-roles
endpoint: POST /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-132 — Admin — Associar role a utilizador em tenant/app

## Endpoint
`POST /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: UserRoles | Action: Create | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Body: `CreateUserRoleRequest` — appId (int), userId (int), roleId (int)

## Response

**Status:** 201 Created

## Componentes Frontend Sugeridos
- `AdminCreateUserRoleForm`, `useAdminCreateUserRole`
