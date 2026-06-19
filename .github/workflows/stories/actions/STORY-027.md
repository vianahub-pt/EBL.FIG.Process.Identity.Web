---
id: STORY-027
title: "Listar todas as ações"
type: STORY
status: To do
resource: actions
endpoint: GET /v1/actions/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-027 — Listar todas as ações

## Como utilizador com perfil Admin, BackOffice, Manager ou Operator
Eu quero visualizar todas as ações disponíveis
Para que possa gerir as permissões de acesso do sistema

## Endpoint
`GET /v1/actions/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: Actions | Action: Read

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
  { "id": 1, "name": "Read", "isActive": true },
  { "id": 2, "name": "Create", "isActive": true }
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
- **Dado que** o utilizador tem permissão Actions/Read
- **Quando** acede à lista
- **Então** vê todas as ações com id, name, isActive

## Cenários BDD

### Cenário 1: Listagem com sucesso
```gherkin
Given o utilizador está autenticado com permissão Actions/Read
When acede à lista de ações
Then vê todas as ações disponíveis
```

## Componentes Frontend Sugeridos
- `ActionListPage`, `ActionTable`, `useGetAllActions`
