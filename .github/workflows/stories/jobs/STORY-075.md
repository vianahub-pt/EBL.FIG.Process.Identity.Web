---
id: STORY-075
title: "Listar todos os job definitions"
type: STORY
status: To do
resource: jobs
endpoint: GET /v1/job-definitions/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-075 — Listar todos os job definitions

## Endpoint
`GET /v1/job-definitions/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Read

## Response

### Sucesso
**Status:** 200 OK
```json
[
  {
    "id": 1,
    "jobCategory": "Sync",
    "jobName": "SyncUsersJob",
    "cronExpression": "0 */6 * * *",
    "priority": 1,
    "isActive": true
  }
]
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Sem jobs |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Listagem bem-sucedida
- **Dado que** autenticado com permissão JobDefinitions/Read
- **Quando** acede à lista
- **Então** vê todos os jobs com id, jobCategory, jobName, cronExpression, priority, isActive

## Componentes Frontend Sugeridos
- `JobListPage`, `JobTable`, `useGetAllJobs`
