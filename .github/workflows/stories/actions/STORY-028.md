---
id: STORY-028
title: "Obter ação por ID"
type: STORY
status: For Deploy
resource: actions
endpoint: GET /v1/actions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-j
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-028 — Obter ação por ID

## Como utilizador com perfil Admin, BackOffice, Manager ou Operator
Eu quero visualizar os detalhes de uma ação específica
Para que possa consultar todas as informações da ação

## Endpoint
`GET /v1/actions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: Actions | Action: Read

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da ação |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "name": "Read",
  "description": "Permissão de leitura",
  "isActive": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | ID inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Ação não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Ação encontrada
- **Dado que** existe uma ação com o ID fornecido
- **Quando** acede ao detalhe
- **Então** vê id, name, description, isActive

### CA-02: Ação não encontrada
- **Dado que** o ID não existe
- **Quando** tenta aceder
- **Então** é exibido erro 410 Gone

## Cenários BDD

### Cenário 1: Detalhe da ação
```gherkin
Given existe ação id=1
When acede a GET /v1/actions/1
Then vê id=1, name="Read", description, isActive
```

## Componentes Frontend Sugeridos
- `ActionDetailPage`, `useGetActionById`
