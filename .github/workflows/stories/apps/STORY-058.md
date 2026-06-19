---
id: STORY-058
title: "Obter aplicação por ID"
type: STORY
status: For Deploy
resource: apps
endpoint: GET /v1/apps/{id}
priority: Medium
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/apps-crud
pr: "pending-push"
---

# STORY-058 — Obter aplicação por ID

## Endpoint
`GET /v1/apps/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Read

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da aplicação |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "tenantId": 1,
  "name": "Portal RH",
  "description": "Sistema de gestão de recursos humanos",
  "isActive": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | App não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: App encontrada
- **Dado que** existe app com ID
- **Quando** acede ao detalhe
- **Então** vê id, tenantId, name, description, isActive

## Cenários BDD

### Cenário 1: Detalhe da app
```gherkin
Given app id=1 existe
When acede a GET /v1/apps/1
Then vê AppDetailResponse
```

## Componentes Frontend Sugeridos
- `AppDetailPage`, `useGetAppById`
