---
id: STORY-049
title: "Eliminar permissão de papel"
type: STORY
status: To do
resource: role-permissions
endpoint: DELETE /v1/role-permissions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-049 — Eliminar permissão de papel

## Endpoint
`DELETE /v1/role-permissions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: RolePermissions | Action: Delete

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da permissão |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | Permissão não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Eliminação bem-sucedida
- **Dado que** existe permissão com ID fornecido
- **Quando** confirma eliminação
- **Então** a permissão é removida (204)

## Cenários BDD

### Cenário 1: Eliminação
```gherkin
Given existe role-permission id=1
When confirma eliminação
Then DELETE /v1/role-permissions/1 é enviado
And permissão é removida
```

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteRolePermission`
