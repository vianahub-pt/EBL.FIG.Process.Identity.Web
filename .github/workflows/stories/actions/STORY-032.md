---
id: STORY-032
title: "Ativar ação"
type: STORY
status: For Deploy
resource: actions
endpoint: PATCH /v1/actions/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-j
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-032 — Ativar ação

## Como utilizador com perfil Admin ou BackOffice
Eu quero ativar uma ação inativa

## Endpoint
`PATCH /v1/actions/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Actions | Action: Activate

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

### CA-01: Ativação bem-sucedida
- **Dado que** existe uma ação inativa
- **Quando** ativa
- **Então** isActive muda para true

## Cenários BDD

### Cenário 1: Ativação
```gherkin
Given ação id=1 com isActive=false
When clica em "Ativar"
Then isActive muda para true
```

## Componentes Frontend Sugeridos
- `ActionStatusToggle`, `useActivateAction`
