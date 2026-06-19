---
id: STORY-097
title: "Admin — Ativar app em tenant específico"
type: STORY
status: To do
resource: admin/apps
endpoint: PATCH /v1/admin/tenants/{tenantId}/apps/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-097 — Admin — Ativar app em tenant específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/apps/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Activate | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID da app |

## Response

**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminAppStatusToggle`, `useAdminActivateApp`
