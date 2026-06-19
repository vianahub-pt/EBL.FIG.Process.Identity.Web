---
id: STORY-103
title: "Admin — Criar ação em tenant/app específico"
type: STORY
status: To do
resource: admin/actions
endpoint: POST /v1/admin/tenants/{tenantId}/apps/{appId}/actions
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-103 — Admin — Criar ação em tenant/app específico

## Endpoint
`POST /v1/admin/tenants/{tenantId}/apps/{appId}/actions`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Actions | Action: Create | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| appId | int | Sim | ID da app |

### Body: `CreateActionRequest` — appId (int), name (max 50, obrigatório), description (max 255, obrigatório)

## Response

**Status:** 201 Created

## Componentes Frontend Sugeridos
- `AdminCreateActionForm`, `useAdminCreateAction`
