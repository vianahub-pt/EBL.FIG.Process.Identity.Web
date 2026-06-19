---
id: STORY-098
title: "Admin — Desativar app em tenant específico"
type: STORY
status: To do
resource: admin/apps
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-098 — Admin — Desativar app em tenant específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Deactivate | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID da app |

## Response

**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminAppStatusToggle`, `ConfirmDialog`, `useAdminDeactivateApp`
