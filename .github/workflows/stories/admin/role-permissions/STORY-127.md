---
id: STORY-127
title: "Admin — Criar permissão de role em tenant/app específico"
type: STORY
status: To do
resource: admin/role-permissions
endpoint: POST /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-127 — Admin — Criar permissão de role em tenant/app específico

## Endpoint
`POST /v1/admin/tenants/{tenantId}/apps/{appId}/role-permissions`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: RolePermissions | Action: Create | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Body: `CreateRolePermissionRequest` — roleId (int), resourceId (int), actionId (int)

## Response

**Status:** 201 Created

## Componentes Frontend Sugeridos
- `AdminCreateRolePermissionForm`, `useAdminCreateRolePermission`
