---
id: STORY-107
title: "Admin — Eliminar ação em tenant/app específico"
type: STORY
status: To do
resource: admin/actions
endpoint: DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-107 — Admin — Eliminar ação em tenant/app específico

## Endpoint
`DELETE /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Delete | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 204 No Content

### Erros
| Status | Descrição |
|--------|-----------|
| 410 Gone | Ação não encontrada |

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useAdminDeleteAction`
