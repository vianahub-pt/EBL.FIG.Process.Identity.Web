---
id: STORY-085
title: "Admin — Obter utilizador por ID de um tenant"
type: STORY
status: To do
resource: admin/users
endpoint: GET /v1/admin/tenants/{tenantId}/users/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-085 — Admin — Obter utilizador por ID de um tenant

## Endpoint
`GET /v1/admin/tenants/{tenantId}/users/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID do utilizador |

## Response

### Sucesso
**Status:** 200 OK
```json
{ "id": 1, "name": "João Silva", "phoneNumber": "...", "lastAccessAt": "...", "isActive": true }
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 410 | Gone | Utilizador não encontrado no tenant |

## Critérios de Aceite

### CA-01: Detalhe encontrado
- **Dado que** utilizador existe no tenant
- **Quando** acede ao detalhe
- **Então** vê os campos de `UserResponse`

## Componentes Frontend Sugeridos
- `AdminUserDetailPage`, `useAdminGetUserById`
