---
id: STORY-099
title: "Admin — Eliminar app em tenant específico"
type: STORY
status: To do
resource: admin/apps
endpoint: DELETE /v1/admin/tenants/{tenantId}/apps/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-099 — Admin — Eliminar app em tenant específico

## Endpoint
`DELETE /v1/admin/tenants/{tenantId}/apps/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Delete | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID da app |

## Response

**Status:** 204 No Content

### Erros
| Status | Código | Descrição |
|--------|--------|-----------|
| 410 | Gone | App não encontrada |

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useAdminDeleteApp`
