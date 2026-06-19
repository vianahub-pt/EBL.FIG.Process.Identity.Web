---
id: STORY-137
title: "Admin — Revogar chave JWT de um tenant"
type: STORY
status: To do
resource: admin/jwt-keys
endpoint: PATCH /v1/admin/jwtkeys/{tenantId}/{id}/revoke
priority: Critical
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-137 — Admin — Revogar chave JWT de um tenant

## Endpoint
`PATCH /v1/admin/jwtkeys/{tenantId}/{id}/revoke`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JwtKeys | Action: Revoke | RequireIdentityTenant

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |
| id | int | Sim | ID da chave JWT |

### Body
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| reason | string | Sim | Motivo da revogação |

## Response

### Sucesso
**Status:** 200 OK

## Critérios de Aceite

### CA-01: Revogação bem-sucedida
- **Dado que** Admin ou BackOffice com tenantId e id de chave válidos
- **Quando** submete o motivo da revogação
- **Então** chave é revogada (isActive: false) e retorna 200 OK
- **E** interface exibe toast "Chave JWT revogada com sucesso"

### CA-02: Motivo obrigatório
- **Dado que** utilizador não preenche o motivo
- **Quando** tenta submeter o formulário
- **Então** validação impede envio com mensagem "Motivo é obrigatório"

### CA-03: Confirmação antes de revogar
- **Dado que** utilizador clica em "Revogar"
- **Quando** antes de confirmar
- **Então** modal de confirmação é exibido com aviso de impacto

## Cenário de Borda
- **Duplo clique:** botão desativado após primeiro clique para evitar dupla submissão
- **Chave já revogada:** deve exibir estado informativo sem permitir nova revogação

## Componentes Frontend Sugeridos
- `AdminRevokeJwtKeyModal`, `RevokeReasonForm`, `ConfirmDialog`, `useAdminRevokeJwtKey`

## Impacto Técnico
- **Camadas afetadas:** components/, hooks/, services/
- **Serviços/API:** PATCH /v1/admin/jwtkeys/{tenantId}/{id}/revoke
- **Formulários:** React Hook Form + Zod (reason: string obrigatório)
- **i18n:** `admin.jwtKeys.revoke.reason`, `admin.jwtKeys.revoke.confirm`, `admin.jwtKeys.revoke.success`

## Observações
- Operação crítica — revogar a chave ativa invalida todos os tokens JWT em circulação do tenant
- Exibir aviso explícito de impacto no modal de confirmação
