---
id: STORY-020
title: "Listar papéis com paginação e filtros"
type: STORY
status: To do
resource: roles
endpoint: GET /v1/roles/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-020 — Listar papéis com paginação e filtros

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero listar papéis com paginação
Para que possa navegar por grandes volumes de dados

## Endpoint
`GET /v1/roles/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Read

## Request

### Headers
```
Authorization: Bearer {token}
```

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| search | string | Não | Termo de pesquisa por nome |
| isActive | bool | Não | Filtrar por estado (padrão: true) |
| page | int | Não | Número da página |
| pageSize | int | Não | Tamanho da página |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "items": [
    { "id": 1, "appId": 2, "name": "Manager", "isActive": true }
  ],
  "totalCount": 20,
  "page": 1,
  "pageSize": 10
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Parâmetros inválidos |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Paginação funcional
- **Dado que** existem múltiplos roles
- **Quando** acede à listagem paginada
- **Então** vê os itens da página atual com totalCount

## Cenários BDD

### Cenário 1: Lista paginada
```gherkin
Given o utilizador acede a GET /v1/roles/paged?page=1&pageSize=10
Then vê até 10 roles com informação de paginação
```

## Componentes Frontend Sugeridos
- `RoleListPage` — página com tabela paginada
- `SearchInput`, `Pagination`, `useGetRolesPaged`
