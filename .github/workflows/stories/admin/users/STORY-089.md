---
id: STORY-089
title: "Admin — Ativar utilizador em tenant específico"
type: STORY
status: To do
resource: admin/users
endpoint: PATCH /v1/admin/tenants/{tenantId}/users/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-089 — Admin — Ativar utilizador em tenant específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/users/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Activate | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID do utilizador |

## Response

### Sucesso
**Status:** 204 No Content

## Componentes Frontend Sugeridos
- `AdminUserStatusToggle`, `useAdminActivateUser`
