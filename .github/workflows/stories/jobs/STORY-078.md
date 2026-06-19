---
id: STORY-078
title: "Criar novo job definition"
type: STORY
status: To do
resource: jobs
endpoint: POST /v1/job-definitions/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-078 — Criar novo job definition

## Como utilizador com perfil Admin ou BackOffice
Eu quero criar uma nova definição de job agendado
Para que tarefas automáticas possam ser executadas no sistema

## Endpoint
`POST /v1/job-definitions/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| jobCategory | string | Sim | max 100 chars | Categoria do job |
| jobName | string | Sim | max 150 chars | Nome único do job |
| description | string | Não | max 500 chars | Descrição |
| jobPurpose | string | Não | max 500 chars | Propósito do job |
| jobType | string | Sim | max 100 chars | Tipo do job (ex: Recurring) |
| jobMethod | string | Sim | max 100 chars | Método de execução (ex: HttpPost) |
| cronExpression | string | Sim | max 100 chars | Expressão CRON para agendamento |
| timeZoneId | string | Sim | max 100 chars | Fuso horário (ex: UTC) |
| executeOnlyOnce | bool | Sim | — | Executar apenas uma vez |
| timeoutMinutes | int | Sim | >= 0 | Timeout em minutos |
| priority | int | Sim | >= 0 | Prioridade de execução |
| queue | string | Sim | max 100 chars | Fila de execução |
| maxRetries | int | Sim | >= 0 | Número máximo de tentativas |
| jobConfiguration | string | Não | — | Configuração adicional em JSON |
| isSystemJob | bool | Sim | — | É um job do sistema |

### Exemplo de Request
```json
{
  "jobCategory": "Sync",
  "jobName": "SyncUsersJob",
  "description": "Sincronização de utilizadores",
  "jobPurpose": "Manter dados de utilizadores atualizados",
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
  "isSystemJob": false
}
```

## Response

### Sucesso
**Status:** 201 Created

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Criação bem-sucedida
- **Dado que** todos os campos obrigatórios são válidos
- **Quando** submete
- **Então** job é criado (201)

### CA-02: Expressão CRON inválida
- **Dado que** cronExpression está em branco ou excede 100 chars
- **Quando** submete
- **Então** é exibido erro de validação

## Cenários BDD

### Cenário 1: Criação bem-sucedida
```gherkin
Given todos os campos obrigatórios preenchidos corretamente
When submete
Then job é criado com status 201
```

## Componentes Frontend Sugeridos
- `CreateJobForm` — formulário com validação
- `CronExpressionInput` — campo de expressão CRON com preview
- `useCreateJob`
