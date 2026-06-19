---
id: STORY-095
title: "Admin — Criar app em tenant específico"
type: STORY
status: To do
resource: admin/apps
endpoint: POST /v1/admin/tenants/{tenantId}/apps
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-095 — Admin — Criar app em tenant específico

## Endpoint
`POST /v1/admin/tenants/{tenantId}/apps`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Apps | Action: Create | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 200 | Nome da app |
| description | string | Sim | max 500 | Descrição |

## Response

**Status:** 201 Created

## Componentes Frontend Sugeridos
- `AdminCreateAppForm`, `useAdminCreateApp`
