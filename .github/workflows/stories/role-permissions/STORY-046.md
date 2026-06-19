---
id: STORY-046
title: "Obter permissão de papel por ID"
type: STORY
status: To do
resource: role-permissions
endpoint: GET /v1/role-permissions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-046 — Obter permissão de papel por ID

## Endpoint
`GET /v1/role-permissions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: RolePermissions | Action: Read

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da permissão |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "roleId": 3,
  "role": "Manager",
  "resourceId": 1,
  "resource": "Users",
  "actionId": 1,
  "action": "Read"
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | ID inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Permissão não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Detalhe encontrado
- **Dado que** existe permissão com ID
- **Quando** acede ao detalhe
- **Então** vê todos os campos do `RolePermissionDetailResponse`

## Cenários BDD

### Cenário 1: Detalhe
```gherkin
Given existe role-permission id=1
When acede a GET /v1/role-permissions/1
Then vê id, roleId, role, resourceId, resource, actionId, action
```

## Componentes Frontend Sugeridos
- `RolePermissionDetailPage`, `useGetRolePermissionById`
