---
id: STORY-133
title: "Admin — Remover role de utilizador em tenant/app"
type: STORY
status: To do
resource: admin/user-roles
endpoint: DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-133 — Admin — Remover role de utilizador em tenant/app

## Endpoint
`DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/user-roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: UserRoles | Action: Delete | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 204 No Content

### Erros: 404 Not Found se não encontrado

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useAdminDeleteUserRole`
