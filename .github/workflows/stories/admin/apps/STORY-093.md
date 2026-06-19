---
id: STORY-093
title: "Admin — Obter app por ID de um tenant"
type: STORY
status: To do
resource: admin/apps
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-093 — Admin — Obter app por ID de um tenant

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID da app |

## Response

**Status:** 200 OK — `AppDetailResponse` (id, tenantId, name, description, isActive)

### Erros
| Status | Código | Descrição |
|--------|--------|-----------|
| 410 | Gone | App não encontrada |

## Componentes Frontend Sugeridos
- `AdminAppDetailPage`, `useAdminGetAppById`
