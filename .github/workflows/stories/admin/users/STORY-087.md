---
id: STORY-087
title: "Admin — Criar utilizador em tenant específico"
type: STORY
status: To do
resource: admin/users
endpoint: POST /v1/admin/tenants/{tenantId}/users
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-087 — Admin — Criar utilizador em tenant específico

## Endpoint
`POST /v1/admin/tenants/{tenantId}/users`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Create | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 200 | Nome |
| secret | string | Sim | 8–100 + complexidade | Senha |
| confirmSecret | string | Sim | igual a secret | Confirmação |
| email | string | Não | max 500 | Email |
| urlImage | string | Não | max 500 | URL imagem |

## Response

### Sucesso
**Status:** 201 Created

## Componentes Frontend Sugeridos
- `AdminCreateUserForm`, `useAdminCreateUser`
