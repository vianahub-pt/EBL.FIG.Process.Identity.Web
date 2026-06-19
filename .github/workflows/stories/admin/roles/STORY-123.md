---
id: STORY-123
title: "Admin — Eliminar role em tenant/app específico"
type: STORY
status: To do
resource: admin/roles
endpoint: DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-123 — Admin — Eliminar role em tenant/app específico

## Endpoint
`DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Delete | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response: 204 No Content

### Erros: 410 Gone se não encontrado

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useAdminDeleteRole`
