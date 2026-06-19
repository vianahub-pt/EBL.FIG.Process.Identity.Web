---
id: STORY-083
title: "Eliminar job definition"
type: STORY
status: To do
resource: jobs
endpoint: DELETE /v1/job-definitions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-083 — Eliminar job definition

## Endpoint
`DELETE /v1/job-definitions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Delete

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do job |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | Job não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Eliminação bem-sucedida
- **Dado que** job existe
- **Quando** confirma eliminação
- **Então** job é removido (204)

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteJob`
