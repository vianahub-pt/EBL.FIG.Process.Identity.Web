---
id: STORY-073
title: "Eliminar tenant"
type: STORY
status: To do
resource: tenants
endpoint: DELETE /v1/tenants/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-073 — Eliminar tenant

## Endpoint
`DELETE /v1/tenants/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Delete

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do tenant |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | Tenant não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Eliminação bem-sucedida
- **Dado que** tenant existe
- **Quando** confirma eliminação
- **Então** tenant é removido (204)

## Componentes Frontend Sugeridos
- `DeleteButton`, `ConfirmDialog`, `useDeleteTenant`
