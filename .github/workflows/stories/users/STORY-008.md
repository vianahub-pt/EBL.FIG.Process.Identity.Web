---
id: STORY-008
title: "Listar todos os utilizadores"
type: STORY
status: To do
resource: users
endpoint: GET /v1/users/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-008 — Listar todos os utilizadores

## Como utilizador com perfil Admin, BackOffice, Manager ou Operator
Eu quero visualizar a lista completa de utilizadores
Para que possa gerir os utilizadores da plataforma

## Endpoint
`GET /v1/users/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: Users | Action: Read

## Request

### Headers
```
Authorization: Bearer {token}
```

## Response

### Sucesso
**Status:** 200 OK
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "phoneNumber": "912345678",
    "lastAccessAt": "2026-06-15T10:30:00Z",
    "isActive": true
  }
]
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido ou não fornecido |
| 403 | Forbidden | Role sem permissão para Users/Read |
| 500 | Internal Server Error | Erro interno do servidor |

## Critérios de Aceite

### CA-01: Listagem bem-sucedida
- **Dado que** o utilizador tem permissão Users/Read
- **Quando** acede à lista de utilizadores
- **Então** vê a lista completa de utilizadores com id, name, phoneNumber, lastAccessAt e isActive

### CA-02: Sem permissão
- **Dado que** o utilizador não tem o role adequado
- **Quando** tenta aceder à lista
- **Então** recebe erro 403 e mensagem de acesso negado

## Cenários BDD

### Cenário 1: Listagem com sucesso
```gherkin
Given o utilizador está autenticado com role Admin
When acede à página de listagem de utilizadores
Then a lista de utilizadores é apresentada
And cada item mostra id, name, phoneNumber, lastAccessAt, isActive
```

### Cenário 2: Sem autorização
```gherkin
Given o utilizador está autenticado sem role adequado
When tenta aceder à página de utilizadores
Then é exibida mensagem de acesso negado (403)
```

## Componentes Frontend Sugeridos
- `UserListPage` — página de listagem
- `UserTable` — tabela com colunas id, nome, telefone, último acesso, estado
- `useGetAllUsers` — hook useQuery para GET /v1/users/
- `ActiveBadge` — componente de estado ativo/inativo

## Observações
- Retorna array de `UserResponse` (sem paginação)
- Para listas grandes, preferir o endpoint paginado `/v1/users/paged`
