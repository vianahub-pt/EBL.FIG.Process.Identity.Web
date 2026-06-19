---
id: STORY-082
title: "Desativar job definition"
type: STORY
status: To do
resource: jobs
endpoint: PATCH /v1/job-definitions/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-082 — Desativar job definition

## Endpoint
`PATCH /v1/job-definitions/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Deactivate

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

### CA-01: Desativação bem-sucedida
- **Dado que** job ativo
- **Quando** desativa
- **Então** isActive muda para false

## Componentes Frontend Sugeridos
- `JobStatusToggle`, `ConfirmDialog`, `useDeactivateJob`
