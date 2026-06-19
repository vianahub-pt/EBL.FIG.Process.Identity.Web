---
id: STORY-116
title: "Admin — Listar roles de tenant/app"
type: STORY
status: To do
resource: admin/roles
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/roles
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-116 — Admin — Listar roles de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/roles`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Response

**Status:** 200 OK — Array de `RoleResponse` (id, appId, name, isActive)

## Componentes Frontend Sugeridos
- `AdminRoleListPage`, `useAdminGetAllRoles`
