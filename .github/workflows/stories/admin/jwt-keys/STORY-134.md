---
id: STORY-134
title: "Admin — Listar chaves JWT de um tenant"
type: STORY
status: To do
resource: admin/jwt-keys
endpoint: GET /v1/admin/jwtkeys/{tenantId}
priority: High
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-134 — Admin — Listar chaves JWT de um tenant

## Endpoint
`GET /v1/admin/jwtkeys/{tenantId}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JwtKeys | Action: Read | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

## Response

### Sucesso
**Status:** 200 OK
```json
[
  {
    "id": 1,
    "tenantId": 10,
    "keyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "publicKey": "-----BEGIN PUBLIC KEY-----...",
    "isActive": true
  }
]
```

## Critérios de Aceite

### CA-01: Listagem de chaves JWT
- **Dado que** Admin ou BackOffice acede com tenantId válido
- **Quando** solicita a lista de chaves JWT
- **Então** recebe array de `JwtKeyResponse` com id, tenantId, keyId (GUID), publicKey e isActive

### CA-02: Sem chaves cadastradas
- **Dado que** tenant sem chaves JWT
- **Quando** solicita a lista
- **Então** recebe array vazio

### CA-03: Tenant inválido / sem permissão
- **Dado que** utilizador sem role adequada ou tenant não autorizado
- **Quando** acede ao endpoint
- **Então** recebe 401 ou 403

## Componentes Frontend Sugeridos
- `AdminJwtKeyListPage`, `JwtKeyTable`, `useAdminGetJwtKeys`

## Observações
- `publicKey` pode ser longa — truncar na tabela e expandir em modal
- `keyId` é UUID — exibir formatado
