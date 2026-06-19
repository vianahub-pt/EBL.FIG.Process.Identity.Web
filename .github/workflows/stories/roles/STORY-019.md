---
id: STORY-019
title: "Obter papel (role) por ID"
type: STORY
status: To do
resource: roles
endpoint: GET /v1/roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-019 — Obter papel (role) por ID

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero visualizar os detalhes de um papel específico
Para que possa consultar todas as informações do role

## Endpoint
`GET /v1/roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Read

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do role |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "appId": 2,
  "name": "Manager",
  "description": "Papel de gestão de utilizadores",
  "isActive": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | ID inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Role não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Role encontrado
- **Dado que** existe um role com o ID fornecido
- **Quando** acede ao detalhe
- **Então** vê id, appId, name, description, isActive

### CA-02: Role não encontrado
- **Dado que** o ID não existe
- **Quando** tenta aceder
- **Então** é exibida mensagem de erro 410 Gone

## Cenários BDD

### Cenário 1: Detalhe do role
```gherkin
Given existe role id=1
When acede a GET /v1/roles/1
Then vê id=1, name, description, appId, isActive
```

### Cenário 2: ID inexistente
```gherkin
Given não existe role id=999
When acede a GET /v1/roles/999
Then recebe erro 410 Gone
```

## Componentes Frontend Sugeridos
- `RoleDetailPage` — página de detalhe
- `useGetRoleById` — hook useQuery

## Observações
- Retorna `RoleDetailResponse` com campo description adicional
- Erro 410 Gone (não 404) para recurso removido/não encontrado
