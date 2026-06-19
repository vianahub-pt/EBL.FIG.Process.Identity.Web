---
id: STORY-108
title: "Admin — Listar recursos de tenant/app"
type: STORY
status: To do
resource: admin/resources
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/resources
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-108 — Admin — Listar recursos de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/resources`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId

## Response

**Status:** 200 OK — Array de `ResourceResponse` (id, appId, name, isActive)

## Componentes Frontend Sugeridos
- `AdminResourceListPage`, `useAdminGetAllResources`
