---
id: STORY-064
title: "Eliminar aplicação"
type: STORY
status: For Deploy
resource: apps
endpoint: DELETE /v1/apps/{id}
priority: Medium
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/apps-crud
pr: "pending-push"
---

# STORY-064 — Eliminar aplicação

## Endpoint
`DELETE /v1/apps/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Delete

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da app |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | App não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Eliminação bem-sucedida
- **Dado que** app existe
- **Quando** confirma eliminação
- **Então** app é removida

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteApp`
