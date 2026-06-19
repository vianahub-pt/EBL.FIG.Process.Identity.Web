---
id: STORY-117
title: "Admin — Obter role por ID de tenant/app"
type: STORY
status: To do
resource: admin/roles
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-117 — Admin — Obter role por ID de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 200 OK — `RoleDetailResponse` (id, appId, name, description, isActive)

## Componentes Frontend Sugeridos
- `AdminRoleDetailPage`, `useAdminGetRoleById`
