---
id: STORY-121
title: "Admin — Ativar role em tenant/app específico"
type: STORY
status: To do
resource: admin/roles
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-121 — Admin — Ativar role em tenant/app específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Activate | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response: 204 No Content

## Componentes Frontend Sugeridos
- `AdminRoleStatusToggle`, `useAdminActivateRole`
