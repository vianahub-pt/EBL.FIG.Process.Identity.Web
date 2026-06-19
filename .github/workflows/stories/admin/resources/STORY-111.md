---
id: STORY-111
title: "Admin — Criar recurso em tenant/app específico"
type: STORY
status: To do
resource: admin/resources
endpoint: POST /v1/admin/tenants/{tenantId}/apps/{appId}/resources
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-111 — Admin — Criar recurso em tenant/app específico

## Endpoint
`POST /v1/admin/tenants/{tenantId}/apps/{appId}/resources`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Create | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Body: `CreateResourceRequest` — appId (int, >0), name (max 100, obrigatório), description (max 255, opcional)

## Response

**Status:** 201 Created

## Componentes Frontend Sugeridos
- `AdminCreateResourceForm`, `useAdminCreateResource`
