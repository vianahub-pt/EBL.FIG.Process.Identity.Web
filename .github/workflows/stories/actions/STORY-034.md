---
id: STORY-034
title: "Eliminar ação"
type: STORY
status: For Deploy
resource: actions
endpoint: DELETE /v1/actions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-j
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-034 — Eliminar ação

## Como utilizador com perfil Admin ou BackOffice
Eu quero eliminar uma ação
Para que ações obsoletas sejam removidas

## Endpoint
`DELETE /v1/actions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Actions | Action: Delete

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

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | ID inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Ação não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Eliminação bem-sucedida
- **Dado que** existe ação com ID fornecido
- **Quando** confirma eliminação
- **Então** a ação é removida

## Cenários BDD

### Cenário 1: Eliminação com confirmação
```gherkin
Given o admin clica em "Eliminar" na ação id=1
When confirma
Then DELETE /v1/actions/1 é enviado
And a ação é removida
```

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteAction`
