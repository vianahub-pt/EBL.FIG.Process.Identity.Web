---
id: STORY-055
title: "Remover papel de utilizador"
type: STORY
status: To do
resource: user-roles
endpoint: DELETE /v1/user-roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-055 — Remover papel de utilizador

## Endpoint
`DELETE /v1/user-roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: UserRoles | Action: Delete

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da atribuição |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Atribuição não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Remoção bem-sucedida
- **Dado que** existe atribuição com ID fornecido
- **Quando** confirma remoção
- **Então** a atribuição é eliminada (204)

## Cenários BDD

### Cenário 1: Remoção
```gherkin
Given user-role id=1 existe
When confirma remoção
Then DELETE /v1/user-roles/1 é enviado
And atribuição é removida
```

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteUserRole`
