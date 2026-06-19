---
id: STORY-023
title: "Ativar papel (role)"
type: STORY
status: To do
resource: roles
endpoint: PATCH /v1/roles/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-023 — Ativar papel (role)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero ativar um papel inativo
Para que utilizadores possam ser atribuídos a este papel

## Endpoint
`PATCH /v1/roles/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Activate

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

### CA-01: Ativação bem-sucedida
- **Dado que** existe um role inativo
- **Quando** o gestor ativa
- **Então** isActive muda para true

## Cenários BDD

### Cenário 1: Ativação bem-sucedida
```gherkin
Given role id=1 com isActive=false
When o gestor clica em "Ativar"
Then isActive muda para true e a lista é atualizada
```

## Componentes Frontend Sugeridos
- `RoleStatusToggle`, `useActivateRole`
