---
id: STORY-080
title: "Atualizar job definition"
type: STORY
status: To do
resource: jobs
endpoint: PUT /v1/job-definitions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-080 — Atualizar job definition

## Endpoint
`PUT /v1/job-definitions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Update

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do job |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| description | string | Não | — | Descrição |
| jobPurpose | string | Não | — | Propósito |
| cronExpression | string | Não | — | Expressão CRON |
| timeZoneId | string | Não | — | Fuso horário |
| timeoutMinutes | int | Sim | >= 0 | Timeout |
| priority | int | Sim | >= 0 | Prioridade |
| queue | string | Não | — | Fila |
| maxRetries | int | Sim | >= 0 | Max tentativas |
| jobConfiguration | string | Não | — | Configuração JSON |
| isActive | bool | Sim | — | Estado ativo |

### Exemplo de Request
```json
{
  "description": "Sincronização atualizada",
  "cronExpression": "0 */12 * * *",
  "timeZoneId": "Europe/Lisbon",
  "timeoutMinutes": 60,
  "priority": 2,
  "queue": "high-priority",
  "maxRetries": 5,
  "jobConfiguration": "{}",
  "isActive": true
}
```

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | Job não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atualização bem-sucedida
- **Dado que** job existe e dados válidos
- **Quando** submete
- **Então** job é atualizado (204)

## Componentes Frontend Sugeridos
- `EditJobForm`, `useUpdateJob`
