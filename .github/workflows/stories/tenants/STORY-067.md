---
id: STORY-067
title: "Obter tenant por ID"
type: STORY
status: To do
resource: tenants
endpoint: GET /v1/tenants/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-067 — Obter tenant por ID

## Endpoint
`GET /v1/tenants/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Read

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do tenant |

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "id": 1,
  "name": "Empresa Exemplo",
  "alias": "emp-exemplo",
  "isActive": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | Tenant não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Tenant encontrado
- **Dado que** existe tenant com ID
- **Quando** acede ao detalhe
- **Então** vê id, name, alias, isActive (TenantResponse)

## Componentes Frontend Sugeridos
- `TenantDetailPage`, `useGetTenantById`

## Observações
- Este endpoint retorna `TenantResponse` (não `TenantDetailResponse`)
