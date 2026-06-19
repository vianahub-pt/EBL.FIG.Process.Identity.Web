---
id: STORY-084
title: "Admin — Listar utilizadores de um tenant"
type: STORY
status: To do
resource: admin/users
endpoint: GET /v1/admin/tenants/{tenantId}/users
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-084 — Admin — Listar utilizadores de um tenant

## Endpoint
`GET /v1/admin/tenants/{tenantId}/users`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Users | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

## Response

### Sucesso
**Status:** 200 OK
```json
[
  { "id": 1, "name": "João Silva", "phoneNumber": "912345678", "lastAccessAt": "2026-06-15T10:30:00Z", "isActive": true }
]
```

## Critérios de Aceite

### CA-01: Listagem bem-sucedida
- **Dado que** BackOffice acede com tenantId válido
- **Quando** acede à lista
- **Então** vê utilizadores do tenant

## Componentes Frontend Sugeridos
- `AdminUserListPage`, `useAdminGetAllUsers`

## Observações
- Requer `RequireIdentityTenant` — o tenant no token deve corresponder ao tenantId
