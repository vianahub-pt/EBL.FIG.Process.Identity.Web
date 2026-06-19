---
id: STORY-016
title: "Eliminar utilizador"
type: STORY
status: To do
resource: users
endpoint: DELETE /v1/users/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-016 — Eliminar utilizador

## Como utilizador com perfil Admin ou BackOffice
Eu quero eliminar permanentemente um utilizador
Para que registos obsoletos sejam removidos do sistema

## Endpoint
`DELETE /v1/users/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Users | Action: Delete

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do utilizador a eliminar |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Utilizador não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Eliminação bem-sucedida
- **Dado que** existe um utilizador com o ID fornecido
- **Quando** o admin confirma a eliminação
- **Então** o utilizador é removido do sistema e da lista

### CA-02: Confirmação obrigatória
- **Dado que** o admin clica em "Eliminar"
- **Quando** é apresentado diálogo de confirmação
- **Então** apenas após confirmar a eliminação é processada

### CA-03: Utilizador não encontrado
- **Dado que** o ID não existe
- **Quando** tenta eliminar
- **Então** é exibida mensagem de erro 404

## Cenários BDD

### Cenário 1: Eliminação bem-sucedida
```gherkin
Given o admin está na lista de utilizadores
When clica em "Eliminar" no utilizador id=10 e confirma
Then DELETE /v1/users/10 é enviado
And o utilizador é removido da lista
```

### Cenário 2: Cancelamento da eliminação
```gherkin
Given o admin clica em "Eliminar"
When o diálogo de confirmação aparece e cancela
Then nenhuma ação é tomada
```

## Componentes Frontend Sugeridos
- `DeleteButton` — botão de eliminar com ícone
- `ConfirmDialog` — diálogo de confirmação com aviso de irreversibilidade
- `useDeleteUser` — hook useMutation

## Observações
- Ação irreversível — exibir aviso claro no diálogo de confirmação
- Apenas roles Admin e BackOffice têm permissão
