---
id: STORY-052
title: "Obter papel de utilizador por ID"
type: STORY
status: To do
resource: user-roles
endpoint: GET /v1/user-roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-052 — Obter papel de utilizador por ID

## Endpoint
`GET /v1/user-roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, Operator | Resource: UserRoles | Action: Read

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da atribuição |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "tenantId": 1,
  "tenant": "Empresa Exemplo",
  "userId": 10,
  "user": "João Silva",
  "roleId": 3,
  "role": "Manager",
  "userName": "João Silva",
  "roleName": "Manager"
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Atribuição não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Detalhe encontrado
- **Dado que** existe atribuição com o ID
- **Quando** acede ao detalhe
- **Então** vê todos os campos do `UserRoleDetailResponse`

## Cenários BDD

### Cenário 1: Detalhe
```gherkin
Given existe user-role id=1
When acede a GET /v1/user-roles/1
Then vê id, tenantId, tenant, userId, user, roleId, role
```

## Componentes Frontend Sugeridos
- `UserRoleDetailPage`, `useGetUserRoleById`
