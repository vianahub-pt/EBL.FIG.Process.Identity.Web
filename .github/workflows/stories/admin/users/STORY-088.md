---
id: STORY-088
title: "Admin — Atualizar utilizador em tenant específico"
type: STORY
status: To do
resource: admin/users
endpoint: PUT /v1/admin/tenants/{tenantId}/users/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-088 — Admin — Atualizar utilizador em tenant específico

## Endpoint
`PUT /v1/admin/tenants/{tenantId}/users/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Update | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID do utilizador |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Não | max 200 | Nome |
| urlImage | string | Não | max 500 | URL imagem |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 410 | Gone | Utilizador não encontrado |

## Componentes Frontend Sugeridos
- `AdminEditUserForm`, `useAdminUpdateUser`
