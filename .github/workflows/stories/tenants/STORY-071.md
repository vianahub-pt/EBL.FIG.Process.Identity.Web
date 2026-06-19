---
id: STORY-071
title: "Ativar tenant"
type: STORY
status: To do
resource: tenants
endpoint: PATCH /v1/tenants/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-071 — Ativar tenant

## Endpoint
`PATCH /v1/tenants/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Activate

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

### CA-01: Ativação bem-sucedida
- **Dado que** tenant inativo
- **Quando** ativa
- **Então** isActive muda para true (204)

## Componentes Frontend Sugeridos
- `TenantStatusToggle`, `useActivateTenant`
