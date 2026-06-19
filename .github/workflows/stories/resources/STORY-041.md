---
id: STORY-041
title: "Ativar recurso"
type: STORY
status: To do
resource: resources
endpoint: PATCH /v1/resources/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-041 — Ativar recurso

## Endpoint
`PATCH /v1/resources/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Activate

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do recurso |

## Response

### Sucesso
**Status:** 200 OK

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | ID inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Ativação bem-sucedida
- **Dado que** existe recurso inativo
- **Quando** ativa
- **Então** isActive muda para true

## Cenários BDD

### Cenário 1: Ativação
```gherkin
Given recurso id=1 com isActive=false
When clica em "Ativar"
Then isActive muda para true
```

## Componentes Frontend Sugeridos
- `ResourceStatusToggle`, `useActivateResource`
