---
id: STORY-120
title: "Admin — Atualizar role em tenant/app específico"
type: STORY
status: To do
resource: admin/roles
endpoint: PUT /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-120 — Admin — Atualizar role em tenant/app específico

## Endpoint
`PUT /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Update | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Body: `UpdateRoleRequest` — name (max 100), description (max 255)

## Response: 204 No Content

## Componentes Frontend Sugeridos
- `AdminEditRoleForm`, `useAdminUpdateRole`
