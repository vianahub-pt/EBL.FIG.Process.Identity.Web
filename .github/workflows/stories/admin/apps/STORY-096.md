---
id: STORY-096
title: "Admin — Atualizar app em tenant específico"
type: STORY
status: To do
resource: admin/apps
endpoint: PUT /v1/admin/tenants/{tenantId}/apps/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-096 — Admin — Atualizar app em tenant específico

## Endpoint
`PUT /v1/admin/tenants/{tenantId}/apps/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Update | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID da app |

### Body: `UpdateAppRequest` — name (max 200), description (max 500)

## Response

**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminEditAppForm`, `useAdminUpdateApp`
