---
id: STORY-106
title: "Admin — Desativar ação em tenant/app específico"
type: STORY
status: To do
resource: admin/actions
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-106 — Admin — Desativar ação em tenant/app específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Deactivate | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminActionStatusToggle`, `ConfirmDialog`, `useAdminDeactivateAction`
