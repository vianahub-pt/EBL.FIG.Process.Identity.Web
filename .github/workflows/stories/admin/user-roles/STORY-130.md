---
id: STORY-130
title: "Admin — Obter role de utilizador por ID de tenant/app"
type: STORY
status: To do
resource: admin/user-roles
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-130 — Admin — Obter role de utilizador por ID de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: UserRoles | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 200 OK — `UserRoleDetailResponse` (id, tenantId, tenant, userId, user, roleId, role, userName, roleName)

### Erros: 404 Not Found se não encontrado

## Componentes Frontend Sugeridos
- `AdminUserRoleDetailPage`, `useAdminGetUserRoleById`
