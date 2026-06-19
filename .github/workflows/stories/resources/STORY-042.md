---
id: STORY-042
title: "Desativar recurso"
type: STORY
status: To do
resource: resources
endpoint: PATCH /v1/resources/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-042 — Desativar recurso

## Endpoint
`PATCH /v1/resources/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Deactivate

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

### CA-01: Desativação bem-sucedida
- **Dado que** existe recurso ativo
- **Quando** desativa
- **Então** isActive muda para false

## Cenários BDD

### Cenário 1: Desativação
```gherkin
Given recurso id=1 com isActive=true
When clica em "Desativar"
Then isActive muda para false
```

## Componentes Frontend Sugeridos
- `ResourceStatusToggle`, `ConfirmDialog`, `useDeactivateResource`
