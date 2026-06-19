---
id: STORY-025
title: "Eliminar papel (role)"
type: STORY
status: To do
resource: roles
endpoint: DELETE /v1/roles/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-025 — Eliminar papel (role)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero eliminar um papel
Para que papéis obsoletos sejam removidos do sistema

## Endpoint
`DELETE /v1/roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Delete

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do role |

## Response

### Sucesso
**Status:** 200 OK

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | ID inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Role não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Eliminação bem-sucedida
- **Dado que** existe um role com o ID fornecido
- **Quando** o admin confirma a eliminação
- **Então** o role é removido do sistema

## Cenários BDD

### Cenário 1: Eliminação com confirmação
```gherkin
Given o admin está na lista de roles
When clica em "Eliminar" e confirma
Then DELETE /v1/roles/{id} é enviado
And o role é removido da lista
```

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteRole`

## Observações
- Exibir aviso de irreversibilidade no diálogo de confirmação
