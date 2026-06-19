---
id: STORY-045
title: "Listar todas as permissões de papel"
type: STORY
status: To do
resource: role-permissions
endpoint: GET /v1/role-permissions/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-045 — Listar todas as permissões de papel

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero visualizar todas as permissões atribuídas aos papéis
Para que possa gerir o controlo de acesso

## Endpoint
`GET /v1/role-permissions/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: RolePermissions | Action: Read

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
  { "id": 1, "role": "Manager", "resource": "Users", "action": "Read" }
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
- **Dado que** autenticado com permissão RolePermissions/Read
- **Quando** acede à lista
- **Então** vê todas as permissões com id, role, resource, action

## Cenários BDD

### Cenário 1: Listagem
```gherkin
Given autenticado com permissão RolePermissions/Read
When acede à lista de permissões
Then vê todas as entradas RolePermissionResponse
```

## Componentes Frontend Sugeridos
- `RolePermissionListPage`, `RolePermissionTable`, `useGetAllRolePermissions`
