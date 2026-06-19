---
id: STORY-100
title: "Admin — Listar ações de tenant/app"
type: STORY
status: To do
resource: admin/actions
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/actions
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-100 — Admin — Listar ações de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/actions`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| appId | int | Sim | ID da app |

## Response

**Status:** 200 OK — Array de `ActionResponse` (id, name, isActive)

## Componentes Frontend Sugeridos
- `AdminActionListPage`, `useAdminGetAllActions`
