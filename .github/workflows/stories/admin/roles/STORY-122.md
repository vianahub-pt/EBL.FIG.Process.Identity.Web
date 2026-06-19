---
id: STORY-122
title: "Admin — Desativar role em tenant/app específico"
type: STORY
status: To do
resource: admin/roles
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-122 — Admin — Desativar role em tenant/app específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Deactivate | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response: 204 No Content

## Componentes Frontend Sugeridos
- `AdminRoleStatusToggle`, `ConfirmDialog`, `useAdminDeactivateRole`
