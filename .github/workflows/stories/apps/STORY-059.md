---
id: STORY-059
title: "Listar aplicações com paginação"
type: STORY
status: For Deploy
resource: apps
endpoint: GET /v1/apps/paged
priority: Medium
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/apps-crud
pr: "pending-push"
---

# STORY-059 — Listar aplicações com paginação

## Endpoint
`GET /v1/apps/paged`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Read

## Request

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| search | string | Não | Pesquisa por nome |
| isActive | bool | Não | Filtrar por estado |
| page | int | Não | Número da página |
| pageSize | int | Não | Tamanho da página |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "items": [{ "id": 1, "tenantId": 1, "name": "Portal RH", "isActive": true }],
  "totalCount": 5,
  "page": 1,
  "pageSize": 10
}
```

## Critérios de Aceite

### CA-01: Paginação funcional
- **Dado que** existem múltiplas apps
- **Quando** acede com paginação
- **Então** vê itens paginados

## Componentes Frontend Sugeridos
- `AppListPage`, `Pagination`, `useGetAppsPaged`
