---
id: STORY-047
title: "Listar permissões de papel com paginação"
type: STORY
status: To do
resource: role-permissions
endpoint: GET /v1/role-permissions/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-047 — Listar permissões de papel com paginação

## Endpoint
`GET /v1/role-permissions/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: RolePermissions | Action: Read

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
  "items": [{ "id": 1, "role": "Manager", "resource": "Users", "action": "Read" }],
  "totalCount": 30,
  "page": 1,
  "pageSize": 10
}
```

## Critérios de Aceite

### CA-01: Listagem paginada
- **Dado que** existem múltiplas permissões
- **Quando** acede com parâmetros de paginação
- **Então** vê os itens paginados

## Cenários BDD

### Cenário 1: Paginação
```gherkin
Given acede a GET /v1/role-permissions/paged?page=1&pageSize=10
Then vê até 10 permissões
```

## Componentes Frontend Sugeridos
- `RolePermissionListPage`, `Pagination`, `useGetRolePermissionsPaged`

## Observações
- Operator também tem acesso a este endpoint específico de paginação
