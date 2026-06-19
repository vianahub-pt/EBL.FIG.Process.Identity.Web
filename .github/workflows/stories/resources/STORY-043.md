---
id: STORY-043
title: "Eliminar recurso"
type: STORY
status: To do
resource: resources
endpoint: DELETE /v1/resources/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-043 — Eliminar recurso

## Endpoint
`DELETE /v1/resources/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Delete

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

### CA-01: Eliminação bem-sucedida
- **Dado que** existe recurso com ID fornecido
- **Quando** confirma eliminação
- **Então** o recurso é removido

## Cenários BDD

### Cenário 1: Eliminação
```gherkin
Given recurso id=1 existe
When confirma eliminação
Then DELETE /v1/resources/1 é enviado e recurso removido
```

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteResource`
