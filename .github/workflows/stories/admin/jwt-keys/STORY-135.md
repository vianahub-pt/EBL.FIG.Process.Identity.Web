---
id: STORY-135
title: "Admin — Obter chave JWT ativa de um tenant"
type: STORY
status: To do
resource: admin/jwt-keys
endpoint: GET /v1/admin/jwtkeys/{tenantId}/active
priority: High
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-135 — Admin — Obter chave JWT ativa de um tenant

## Endpoint
`GET /v1/admin/jwtkeys/{tenantId}/active`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JwtKeys | Action: GetActive | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

## Response

### Sucesso com chave ativa
**Status:** 200 OK
```json
{
  "id": 1,
  "tenantId": 10,
  "keyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "publicKey": "-----BEGIN PUBLIC KEY-----...",
  "isActive": true
}
```

### Sem chave ativa
**Status:** 204 No Content

## Critérios de Aceite

### CA-01: Chave ativa existe
- **Dado que** tenant tem chave JWT ativa
- **Quando** solicita a chave ativa
- **Então** recebe `JwtKeyResponse` com isActive: true

### CA-02: Sem chave ativa
- **Dado que** tenant sem chave JWT ativa
- **Quando** solicita a chave ativa
- **Então** recebe 204 No Content
- **E** a interface exibe estado informativo ("Nenhuma chave ativa")

## Componentes Frontend Sugeridos
- `AdminJwtKeyActiveBadge`, `useAdminGetActiveJwtKey`

## Observações
- 204 deve ser tratado no frontend sem erro — é estado válido
