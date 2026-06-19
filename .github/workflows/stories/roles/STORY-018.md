---
id: STORY-018
title: "Listar todos os papéis (roles)"
type: STORY
status: To do
resource: roles
endpoint: GET /v1/roles/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-018 — Listar todos os papéis (roles)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero visualizar todos os papéis disponíveis
Para que possa gerir as permissões de acesso dos utilizadores

## Endpoint
`GET /v1/roles/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Read

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
    "appId": 2,
    "name": "Manager",
    "isActive": true
  }
]
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Erro de request |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Listagem bem-sucedida
- **Dado que** o utilizador tem permissão Roles/Read
- **Quando** acede à lista de papéis
- **Então** vê a lista com id, appId, name, isActive

## Cenários BDD

### Cenário 1: Listagem com sucesso
```gherkin
Given o utilizador está autenticado com role Admin
When acede à lista de roles
Then vê todos os roles com id, appId, name, isActive
```

### Cenário 2: Sem autorização
```gherkin
Given o utilizador sem role adequado
When tenta aceder à lista de roles
Then recebe erro 403
```

## Componentes Frontend Sugeridos
- `RoleListPage` — página de listagem
- `RoleTable` — tabela com colunas
- `useGetAllRoles` — hook useQuery

## Observações
- Retorna array de `RoleResponse`
