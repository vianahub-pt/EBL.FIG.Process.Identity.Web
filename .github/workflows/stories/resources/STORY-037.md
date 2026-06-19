---
id: STORY-037
title: "Obter recurso por ID"
type: STORY
status: To do
resource: resources
endpoint: GET /v1/resources/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-037 — Obter recurso por ID

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero visualizar os detalhes de um recurso específico

## Endpoint
`GET /v1/resources/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Read

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do recurso |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "appId": 2,
  "name": "Users",
  "description": "Gestão de utilizadores",
  "isActive": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | ID inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Recurso encontrado
- **Dado que** existe um recurso com o ID fornecido
- **Quando** acede ao detalhe
- **Então** vê id, appId, name, description, isActive

## Cenários BDD

### Cenário 1: Detalhe do recurso
```gherkin
Given existe recurso id=1
When acede a GET /v1/resources/1
Then vê todos os campos do ResourceDetailResponse
```

## Componentes Frontend Sugeridos
- `ResourceDetailPage`, `useGetResourceById`
