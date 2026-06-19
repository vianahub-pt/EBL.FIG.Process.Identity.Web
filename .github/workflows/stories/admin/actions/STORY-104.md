---
id: STORY-104
title: "Admin — Atualizar ação em tenant/app específico"
type: STORY
status: To do
resource: admin/actions
endpoint: PUT /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-104 — Admin — Atualizar ação em tenant/app específico

## Endpoint
`PUT /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Update | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Body: `UpdateActionRequest` — name (max 50), description (max 255)

## Response

**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminEditActionForm`, `useAdminUpdateAction`
