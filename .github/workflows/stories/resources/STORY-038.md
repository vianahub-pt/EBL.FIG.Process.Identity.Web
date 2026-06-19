---
id: STORY-038
title: "Listar recursos com paginação e filtros"
type: STORY
status: To do
resource: resources
endpoint: GET /v1/resources/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-038 — Listar recursos com paginação e filtros

## Endpoint
`GET /v1/resources/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Read

## Request

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
  "items": [{ "id": 1, "appId": 2, "name": "Users", "isActive": true }],
  "totalCount": 15,
  "page": 1,
  "pageSize": 10
}
```

## Critérios de Aceite

### CA-01: Paginação funcional
- **Dado que** existem múltiplos recursos
- **Quando** acede com parâmetros de paginação
- **Então** vê os itens paginados com totalCount

## Cenários BDD

### Cenário 1: Lista paginada
```gherkin
Given acede a GET /v1/resources/paged?page=1&pageSize=10
Then vê até 10 recursos com paginação
```

## Componentes Frontend Sugeridos
- `ResourceListPage`, `SearchInput`, `Pagination`, `useGetResourcesPaged`
