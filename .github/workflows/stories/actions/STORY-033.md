---
id: STORY-033
title: "Desativar ação"
type: STORY
status: For Deploy
resource: actions
endpoint: PATCH /v1/actions/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-j
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-033 — Desativar ação

## Como utilizador com perfil Admin ou BackOffice
Eu quero desativar uma ação

## Endpoint
`PATCH /v1/actions/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Actions | Action: Deactivate

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

### CA-01: Desativação bem-sucedida
- **Dado que** existe ação ativa
- **Quando** desativa
- **Então** isActive muda para false

## Cenários BDD

### Cenário 1: Desativação
```gherkin
Given ação id=1 com isActive=true
When clica em "Desativar"
Then isActive muda para false
```

## Componentes Frontend Sugeridos
- `ActionStatusToggle`, `ConfirmDialog`, `useDeactivateAction`
