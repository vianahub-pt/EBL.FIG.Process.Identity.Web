---
id: STORY-090
title: "Admin — Desativar utilizador em tenant específico"
type: STORY
status: To do
resource: admin/users
endpoint: PATCH /v1/admin/tenants/{tenantId}/users/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-090 — Admin — Desativar utilizador em tenant específico

## Endpoint
`PATCH /v1/admin/tenants/{tenantId}/users/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Deactivate | RequireIdentityTenant

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
- `AdminUserStatusToggle`, `ConfirmDialog`, `useAdminDeactivateUser`
