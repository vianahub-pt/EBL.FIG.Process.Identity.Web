---
id: STORY-128
title: "Admin — Eliminar permissão de role em tenant/app específico"
type: STORY
status: To do
resource: admin/role-permissions
endpoint: DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-128 — Admin — Eliminar permissão de role em tenant/app específico

## Endpoint
`DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: RolePermissions | Action: Delete | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 204 No Content

### Erros: 404 Not Found se não encontrada

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useAdminDeleteRolePermission`
