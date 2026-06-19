---
id: STORY-051
title: "Listar todos os papéis de utilizador"
type: STORY
status: To do
resource: user-roles
endpoint: GET /v1/user-roles/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-051 — Listar todos os papéis de utilizador

## Endpoint
`GET /v1/user-roles/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: UserRoles | Action: Read

## Response

### Sucesso
**Status:** 200 OK
```json
[
  { "id": 1, "userName": "João Silva", "roleName": "Manager" }
]
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Listagem bem-sucedida
- **Dado que** autenticado com permissão UserRoles/Read
- **Quando** acede à lista
- **Então** vê todas as atribuições com id, userName, roleName

## Cenários BDD

### Cenário 1: Listagem
```gherkin
Given autenticado com permissão UserRoles/Read
When acede à lista de user-roles
Then vê todas as atribuições userName e roleName
```

## Componentes Frontend Sugeridos
- `UserRoleListPage`, `UserRoleTable`, `useGetAllUserRoles`
