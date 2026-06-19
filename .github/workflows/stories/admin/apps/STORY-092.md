---
id: STORY-092
title: "Admin — Listar apps de um tenant"
type: STORY
status: To do
resource: admin/apps
endpoint: GET /v1/admin/tenants/{tenantId}/apps
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-092 — Admin — Listar apps de um tenant

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

## Response

**Status:** 200 OK — Array de `AppResponse` (id, tenantId, name, isActive)

## Componentes Frontend Sugeridos
- `AdminAppListPage`, `useAdminGetAllApps`
