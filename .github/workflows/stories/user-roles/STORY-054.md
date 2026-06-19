---
id: STORY-054
title: "Atribuir papel a utilizador (criar user-role)"
type: STORY
status: To do
resource: user-roles
endpoint: POST /v1/user-roles/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-054 — Atribuir papel a utilizador (criar user-role)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero atribuir um papel a um utilizador
Para que o utilizador tenha as permissões adequadas

## Endpoint
`POST /v1/user-roles/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: UserRoles | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| appId | int | Sim | > 0 | ID da aplicação |
| userId | int | Sim | > 0 | ID do utilizador |
| roleId | int | Sim | > 0 | ID do papel |

### Exemplo de Request
```json
{
  "appId": 2,
  "userId": 10,
  "roleId": 3
}
```

## Response

### Sucesso
**Status:** 201 Created

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atribuição bem-sucedida
- **Dado que** appId, userId e roleId são válidos
- **Quando** submete
- **Então** a atribuição é criada (201)

## Cenários BDD

### Cenário 1: Atribuição
```gherkin
Given appId=2, userId=10, roleId=3
When submete
Then user-role é criado com status 201
```

## Componentes Frontend Sugeridos
- `AssignRoleForm` — dropdowns para selecionar app, utilizador e role
- `useCreateUserRole`
