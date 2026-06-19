---
id: STORY-072
title: "Desativar tenant"
type: STORY
status: To do
resource: tenants
endpoint: PATCH /v1/tenants/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-072 — Desativar tenant

## Endpoint
`PATCH /v1/tenants/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Deactivate

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

### CA-01: Desativação bem-sucedida
- **Dado que** tenant ativo
- **Quando** desativa
- **Então** isActive muda para false (204)

## Componentes Frontend Sugeridos
- `TenantStatusToggle`, `ConfirmDialog`, `useDeactivateTenant`
