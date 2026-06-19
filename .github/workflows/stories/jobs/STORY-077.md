---
id: STORY-077
title: "Listar job definitions com paginação e filtros"
type: STORY
status: To do
resource: jobs
endpoint: GET /v1/job-definitions/paged
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-077 — Listar job definitions com paginação e filtros

## Endpoint
`GET /v1/job-definitions/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Read

## Request

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| search | string | Não | Pesquisa por nome/categoria |
| isActive | bool | Não | Filtrar por estado |
| page | int | Não | Número da página |
| pageSize | int | Não | Tamanho da página |

## Observações
- Utiliza `JobPagedFilter` (não `PagedFilterRequest` padrão) — pode ter campos adicionais específicos de jobs

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "items": [
    {
      "id": 1,
      "jobCategory": "Sync",
      "jobName": "SyncUsersJob",
      "cronExpression": "0 */6 * * *",
      "priority": 1,
      "isActive": true
    }
  ],
  "totalCount": 10,
  "page": 1,
  "pageSize": 10
}
```

## Critérios de Aceite

### CA-01: Paginação funcional
- **Dado que** existem múltiplos jobs
- **Quando** acede com paginação
- **Então** vê itens paginados

## Componentes Frontend Sugeridos
- `JobListPage`, `Pagination`, `useGetJobsPaged`
