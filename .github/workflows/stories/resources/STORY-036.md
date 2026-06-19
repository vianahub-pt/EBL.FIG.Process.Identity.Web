---
id: STORY-036
title: "Listar todos os recursos"
type: STORY
status: To do
resource: resources
endpoint: GET /v1/resources/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-036 — Listar todos os recursos

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero visualizar todos os recursos disponíveis
Para que possa gerir as permissões baseadas em recursos

## Endpoint
`GET /v1/resources/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Read

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
  { "id": 1, "appId": 2, "name": "Users", "isActive": true },
  { "id": 2, "appId": 2, "name": "Roles", "isActive": true }
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
- **Dado que** o utilizador tem permissão Resources/Read
- **Quando** acede à lista
- **Então** vê todos os recursos com id, appId, name, isActive

## Cenários BDD

### Cenário 1: Listagem com sucesso
```gherkin
Given autenticado com permissão Resources/Read
When acede à lista de recursos
Then vê todos os recursos disponíveis
```

## Componentes Frontend Sugeridos
- `ResourceListPage`, `ResourceTable`, `useGetAllResources`
