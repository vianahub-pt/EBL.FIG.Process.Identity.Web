---
id: STORY-015
title: "Desativar utilizador"
type: STORY
status: To do
resource: users
endpoint: PATCH /v1/users/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-015 — Desativar utilizador

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero desativar um utilizador
Para que o utilizador não consiga aceder ao sistema temporariamente

## Endpoint
`PATCH /v1/users/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Users | Action: Deactivate

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do utilizador a desativar |

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

### CA-01: Desativação bem-sucedida
- **Dado que** existe um utilizador ativo com o ID fornecido
- **Quando** o gestor clica em "Desativar"
- **Então** o utilizador fica inativo e a interface é atualizada

### CA-02: Utilizador não encontrado
- **Dado que** o ID não existe
- **Quando** tenta desativar
- **Então** é exibida mensagem de erro 404

## Cenários BDD

### Cenário 1: Desativação bem-sucedida
```gherkin
Given existe utilizador id=10 com isActive=true
When o gestor clica em "Desativar"
Then o sistema envia PATCH /v1/users/10/deactivate
And o estado muda para isActive=false
And a interface é atualizada
```

### Cenário 2: Confirmação de desativação
```gherkin
Given o gestor clica em "Desativar"
When é exibido diálogo de confirmação
And o gestor confirma
Then a desativação é processada
```

## Componentes Frontend Sugeridos
- `UserStatusToggle` — botão de ativar/desativar
- `ConfirmDialog` — diálogo de confirmação antes de desativar
- `useDeactivateUser` — hook useMutation

## Observações
- Recomendado exibir diálogo de confirmação antes de desativar
- A desativação não remove o utilizador, apenas bloqueia o acesso
