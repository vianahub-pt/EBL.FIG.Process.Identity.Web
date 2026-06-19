---
id: STORY-136
title: "Admin — Criar chave JWT inicial para um tenant"
type: STORY
status: To do
resource: admin/jwt-keys
endpoint: POST /v1/admin/jwtkeys/{tenantId}/create-initial
priority: Critical
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-136 — Admin — Criar chave JWT inicial para um tenant

## Endpoint
`POST /v1/admin/jwtkeys/{tenantId}/create-initial`

## Autenticação
**Não** — AllowAnonymous (endpoint público de inicialização)

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| tenantId | int | Sim | ID do tenant |

## Response

### Chave criada (primeira vez)
**Status:** 201 Created

### Chave já existia
**Status:** 200 OK

## Critérios de Aceite

### CA-01: Primeira criação
- **Dado que** tenant sem chave JWT
- **Quando** é feita a chamada ao endpoint
- **Então** chave é gerada e retorna 201

### CA-02: Chave já existe
- **Dado que** tenant já tem chave JWT
- **Quando** é chamado novamente o endpoint
- **Então** retorna 200 OK (idempotente, não cria duplicado)

### CA-03: Feedback visual
- **Quando** chamada retorna 201
- **Então** exibe toast de sucesso "Chave JWT criada com sucesso"
- **Quando** retorna 200
- **Então** exibe informação "Chave JWT já existia"

## Componentes Frontend Sugeridos
- `AdminCreateInitialJwtKeyButton`, `useAdminCreateInitialJwtKey`

## Observações
- Endpoint AllowAnonymous — pode ser chamado durante onboarding de novo tenant
- Frontend deve exibir aviso de que a operação é irreversível como primeira chave
- Distinguir visualmente 201 (novo) de 200 (já existia)
