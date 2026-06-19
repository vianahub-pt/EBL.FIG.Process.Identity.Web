---
id: STORY-053
title: "Listar papéis de utilizador com paginação"
type: STORY
status: To do
resource: user-roles
endpoint: GET /v1/user-roles/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-053 — Listar papéis de utilizador com paginação

## Endpoint
`GET /v1/user-roles/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: UserRoles | Action: Read

## Request

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| search | string | Não | Pesquisa |
| isActive | bool | Não | Filtrar por estado |
| page | int | Não | Número da página |
| pageSize | int | Não | Tamanho da página |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "items": [{ "id": 1, "userName": "João Silva", "roleName": "Manager" }],
  "totalCount": 25,
  "page": 1,
  "pageSize": 10
}
```

## Critérios de Aceite

### CA-01: Paginação funcional
- **Dado que** existem múltiplas atribuições
- **Quando** acede com parâmetros de paginação
- **Então** vê os itens paginados

## Cenários BDD

### Cenário 1: Paginação
```gherkin
Given acede a GET /v1/user-roles/paged?page=1&pageSize=10
Then vê até 10 atribuições
```

## Componentes Frontend Sugeridos
- `UserRoleListPage`, `Pagination`, `useGetUserRolesPaged`
