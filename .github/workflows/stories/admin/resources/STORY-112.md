---
id: STORY-112
title: "Admin — Atualizar recurso em tenant/app específico"
type: STORY
status: To do
resource: admin/resources
endpoint: PUT /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-112 — Admin — Atualizar recurso em tenant/app específico

## Endpoint
`PUT /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Update | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Body: `UpdateResourceRequest` — name (max 100), description (max 255)

## Response

**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminEditResourceForm`, `useAdminUpdateResource`
