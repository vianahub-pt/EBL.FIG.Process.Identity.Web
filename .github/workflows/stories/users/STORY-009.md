---
id: STORY-009
title: "Obter utilizador por ID"
type: STORY
status: To do
resource: users
endpoint: GET /v1/users/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-009 — Obter utilizador por ID

## Como utilizador com perfil Admin, BackOffice, Manager ou Operator
Eu quero visualizar os detalhes de um utilizador específico
Para que possa consultar e gerir informações do utilizador

## Endpoint
`GET /v1/users/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: Users | Action: Read

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do utilizador |

### Exemplo de Request
```
GET /v1/users/10
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 10,
  "tenantId": 1,
  "tenant": "Empresa Exemplo",
  "name": "João Silva",
  "email": "joao.silva@empresa.com",
  "urlImage": "https://cdn.empresa.com/avatar/joao.png",
  "lastAccessAt": "2026-06-15T10:30:00Z",
  "isActive": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Utilizador não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Utilizador encontrado
- **Dado que** existe um utilizador com o ID fornecido
- **Quando** acede ao detalhe do utilizador
- **Então** vê todos os campos do `UserDetailResponse`

### CA-02: Utilizador não encontrado
- **Dado que** o ID não corresponde a nenhum utilizador
- **Quando** tenta aceder
- **Então** é exibida mensagem de erro 404

## Cenários BDD

### Cenário 1: Detalhe do utilizador
```gherkin
Given o utilizador está autenticado com permissão Users/Read
When acede a GET /v1/users/10
Then vê os detalhes do utilizador com id, tenantId, tenant, name, email, urlImage, lastAccessAt, isActive
```

### Cenário 2: ID inexistente
```gherkin
Given não existe utilizador com id=999
When acede a GET /v1/users/999
Then é exibida mensagem de "Utilizador não encontrado" (404)
```

## Componentes Frontend Sugeridos
- `UserDetailPage` — página de detalhe
- `UserDetailCard` — card com todos os campos
- `useGetUserById` — hook useQuery com o id como parâmetro

## Observações
- Retorna `UserDetailResponse` com campos adicionais (tenantId, tenant, email, urlImage)
