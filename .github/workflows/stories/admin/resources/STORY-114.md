---
id: STORY-114
title: "Admin — Desativar recurso em tenant/app específico"
type: STORY
status: To do
resource: admin/resources
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-114 — Admin — Desativar recurso em tenant/app específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Deactivate | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response: 204 No Content

## Componentes Frontend Sugeridos
- `AdminResourceStatusToggle`, `ConfirmDialog`, `useAdminDeactivateResource`
