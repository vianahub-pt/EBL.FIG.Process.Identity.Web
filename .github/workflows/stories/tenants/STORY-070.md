---
id: STORY-070
title: "Atualizar tenant"
type: STORY
status: To do
resource: tenants
endpoint: PUT /v1/tenants/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-070 — Atualizar tenant

## Endpoint
`PUT /v1/tenants/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Update

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do tenant |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 200 chars | Nome |
| description | string | Sim | max 500 chars | Descrição |
| alias | string | Sim | max 30 chars | Alias |
| urlImage | string | Não | max 500 chars | URL do logotipo |
| settings | string | Não | — | Configurações JSON |
| remarks | string | Não | max 1000 chars | Observações |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | Tenant não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atualização bem-sucedida
- **Dado que** tenant existe e dados são válidos
- **Quando** submete
- **Então** tenant é atualizado (204)

## Componentes Frontend Sugeridos
- `EditTenantForm`, `useUpdateTenant`
