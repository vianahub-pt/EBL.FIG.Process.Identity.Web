---
id: STORY-113
title: "Admin — Ativar recurso em tenant/app específico"
type: STORY
status: To do
resource: admin/resources
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-113 — Admin — Ativar recurso em tenant/app específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Activate | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response: 204 No Content

## Componentes Frontend Sugeridos
- `AdminResourceStatusToggle`, `useAdminActivateResource`
