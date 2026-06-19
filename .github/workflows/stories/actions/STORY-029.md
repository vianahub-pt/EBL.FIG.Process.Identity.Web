---
id: STORY-029
title: "Listar ações com paginação e filtros"
type: STORY
status: For Deploy
resource: actions
endpoint: GET /v1/actions/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-p
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-029 — Listar ações com paginação e filtros

## Como utilizador com perfil Admin, BackOffice, Manager ou Operator
Eu quero listar ações com paginação
Para que possa navegar eficientemente

## Endpoint
`GET /v1/actions/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: Actions | Action: Read

## Request

### Headers
```
Authorization: Bearer {token}
```

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| search | string | Não | Pesquisa por nome |
| isActive | bool | Não | Filtrar por estado (padrão: true) |
| page | int | Não | Número da página |
| pageSize | int | Não | Tamanho da página |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "items": [{ "id": 1, "name": "Read", "isActive": true }],
  "totalCount": 10,
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
- **Dado que** existem múltiplas ações
- **Quando** acede à listagem paginada
- **Então** vê os itens da página atual

## Cenários BDD

### Cenário 1: Lista paginada
```gherkin
Given acede a GET /v1/actions/paged?page=1&pageSize=10
Then vê até 10 ações
```

## Componentes Frontend Sugeridos
- `ActionListPage`, `SearchInput`, `Pagination`, `useGetActionsPaged`
