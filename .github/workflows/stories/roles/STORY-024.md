---
id: STORY-024
title: "Desativar papel (role)"
type: STORY
status: To do
resource: roles
endpoint: PATCH /v1/roles/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-024 — Desativar papel (role)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero desativar um papel
Para que não seja mais possível atribuí-lo a novos utilizadores

## Endpoint
`PATCH /v1/roles/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Deactivate

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

### CA-01: Desativação bem-sucedida
- **Dado que** existe um role ativo
- **Quando** o gestor desativa
- **Então** isActive muda para false

## Cenários BDD

### Cenário 1: Desativação bem-sucedida
```gherkin
Given role id=1 com isActive=true
When o gestor clica em "Desativar" e confirma
Then isActive muda para false
```

## Componentes Frontend Sugeridos
- `RoleStatusToggle`, `ConfirmDialog`, `useDeactivateRole`
