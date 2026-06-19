---
id: STORY-076
title: "Obter job definition por ID"
type: STORY
status: To do
resource: jobs
endpoint: GET /v1/job-definitions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-076 — Obter job definition por ID

## Endpoint
`GET /v1/job-definitions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Read

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do job |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "tenantId": 1,
  "tenant": "Empresa Exemplo",
  "jobCategory": "Sync",
  "jobName": "SyncUsersJob",
  "description": "Sincronização de utilizadores",
  "jobPurpose": "Sincronizar dados de utilizadores",
  "jobType": "Recurring",
  "jobMethod": "HttpPost",
  "cronExpression": "0 */6 * * *",
  "timeZoneId": "UTC",
  "executeOnlyOnce": false,
  "timeoutMinutes": 30,
  "priority": 1,
  "queue": "default",
  "maxRetries": 3,
  "jobConfiguration": "{}",
  "isSystemJob": false,
  "hangfireJobId": "job-123",
  "lastRegisteredAt": "2026-06-01T00:00:00Z",
  "nextExecution": "2026-06-16T12:00:00Z",
  "lastExecution": "2026-06-16T06:00:00Z",
  "lastExecutionStatus": "Success",
  "status": 1,
  "isActive": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Job não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Job encontrado
- **Dado que** existe job com ID
- **Quando** acede ao detalhe
- **Então** vê todos os campos do `JobDetailResponse`

## Componentes Frontend Sugeridos
- `JobDetailPage`, `useGetJobById`

## Observações
- Retorna `JobDetailResponse` com campos completos incluindo execução e Hangfire
