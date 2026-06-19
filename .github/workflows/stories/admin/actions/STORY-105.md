---
id: STORY-105
title: "Admin — Ativar ação em tenant/app específico"
type: STORY
status: To do
resource: admin/actions
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-105 — Admin — Ativar ação em tenant/app específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Activate | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminActionStatusToggle`, `useAdminActivateAction`
