---
id: STORY-119
title: "Admin — Criar role em tenant/app específico"
type: STORY
status: To do
resource: admin/roles
endpoint: POST /v1/admin/tenants/{tenantId}/apps/{appId}/roles
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-119 — Admin — Criar role em tenant/app específico

## Endpoint
`POST /v1/admin/tenants/{tenantId}/apps/{appId}/roles`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Roles | Action: Create | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Body: `CreateRoleRequest` — name (max 100, obrigatório), description (max 255, opcional)

## Response

**Status:** 201 Created

## Componentes Frontend Sugeridos
- `AdminCreateRoleForm`, `useAdminCreateRole`
