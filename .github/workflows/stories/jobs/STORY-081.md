---
id: STORY-081
title: "Ativar job definition"
type: STORY
status: To do
resource: jobs
endpoint: PATCH /v1/job-definitions/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-081 — Ativar job definition

## Endpoint
`PATCH /v1/job-definitions/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Activate

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

### CA-01: Ativação bem-sucedida
- **Dado que** job inativo
- **Quando** ativa
- **Então** isActive muda para true

## Componentes Frontend Sugeridos
- `JobStatusToggle`, `useActivateJob`
