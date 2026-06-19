---
id: STORY-115
title: "Admin — Eliminar recurso em tenant/app específico"
type: STORY
status: To do
resource: admin/resources
endpoint: DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-115 — Admin — Eliminar recurso em tenant/app específico

## Endpoint
`DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Delete | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response: 204 No Content

### Erros: 410 Gone se não encontrado

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useAdminDeleteResource`
