---
id: STORY-109
title: "Admin — Obter recurso por ID de tenant/app"
type: STORY
status: To do
resource: admin/resources
endpoint: GET /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-109 — Admin — Obter recurso por ID de tenant/app

## Endpoint
`GET /v1/admin/tenants/{tenantId}/apps/{appId}/resources/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: BackOffice | Resource: Resources | Action: Read | RequireIdentityTenant

## Path Parameters: tenantId, appId, id

## Response

**Status:** 200 OK — `ResourceDetailResponse` (id, appId, name, description, isActive)

## Componentes Frontend Sugeridos
- `AdminResourceDetailPage`, `useAdminGetResourceById`
