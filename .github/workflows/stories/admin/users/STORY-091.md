---
id: STORY-091
title: "Admin — Eliminar utilizador em tenant específico"
type: STORY
status: To do
resource: admin/users
endpoint: DELETE /v1/admin/tenants/{tenantId}/users/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-091 — Admin — Eliminar utilizador em tenant específico

## Endpoint
`DELETE /v1/admin/tenants/{tenantId}/users/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Delete | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID do utilizador |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 410 | Gone | Utilizador não encontrado |

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useAdminDeleteUser`
