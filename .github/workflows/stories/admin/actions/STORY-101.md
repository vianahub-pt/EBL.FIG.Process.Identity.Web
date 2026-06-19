---
id: STORY-101
title: "Admin — Obter ação por ID de tenant/app"
type: STORY
status: To do
resource: admin/actions
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-101 — Admin — Obter ação por ID de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/actions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| appId | int | Sim | ID da app |
| id | int | Sim | ID da ação |

## Response

**Status:** 200 OK — `ActionDetailResponse` (id, name, description, isActive)

## Componentes Frontend Sugeridos
- `AdminActionDetailPage`, `useAdminGetActionById`
