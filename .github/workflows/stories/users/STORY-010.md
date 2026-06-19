---
id: STORY-010
title: "Listar utilizadores com paginação e filtros"
type: STORY
status: To do
resource: users
endpoint: GET /v1/users/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-010 — Listar utilizadores com paginação e filtros

## Como utilizador com perfil Admin, BackOffice, Manager ou Operator
Eu quero listar utilizadores com paginação e filtros
Para que possa navegar por grandes volumes de dados de forma eficiente

## Endpoint
`GET /v1/users/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: Users | Action: Read

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
| page | int | Não | Número da página (Paging base) |
| pageSize | int | Não | Tamanho da página (Paging base) |

### Exemplo de Request
```
GET /v1/users/paged?search=João&isActive=true&page=1&pageSize=10
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "items": [
    {
      "id": 1,
      "name": "João Silva",
      "phoneNumber": "912345678",
      "lastAccessAt": "2026-06-15T10:30:00Z",
      "isActive": true
    }
  ],
  "totalCount": 50,
  "page": 1,
  "pageSize": 10
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Paginação funcional
- **Dado que** existem múltiplos utilizadores
- **Quando** acede à listagem paginada
- **Então** vê os itens da página atual com informação de total e paginação

### CA-02: Filtro por nome
- **Dado que** o utilizador digita um termo de pesquisa
- **Quando** a pesquisa é aplicada
- **Então** apenas utilizadores cujo nome contenha o termo são exibidos

### CA-03: Filtro por estado
- **Dado que** o utilizador seleciona o filtro isActive=false
- **Quando** a lista é carregada
- **Então** apenas utilizadores inativos são exibidos

## Cenários BDD

### Cenário 1: Listagem paginada
```gherkin
Given o utilizador está na lista paginada
When acede com page=1 e pageSize=10
Then vê até 10 utilizadores
And vê o total de registos
```

### Cenário 2: Pesquisa por nome
```gherkin
Given o utilizador digita "João" no campo de pesquisa
When a lista é atualizada
Then apenas utilizadores com "João" no nome aparecem
```

## Componentes Frontend Sugeridos
- `UserListPage` — página com tabela paginada
- `SearchInput` — campo de pesquisa com debounce
- `ActiveFilter` — dropdown para filtrar por isActive
- `Pagination` — componente de paginação
- `useGetUsersPaged` — hook useQuery com parâmetros de paginação

## Observações
- Parâmetros baseados em `PagedFilterRequest` que estende `Paging`
- isActive por padrão é true na API
