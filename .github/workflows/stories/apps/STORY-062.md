---
id: STORY-062
title: "Ativar aplicação"
type: STORY
status: To do
resource: apps
endpoint: PATCH /v1/apps/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-062 — Ativar aplicação

## Endpoint
`PATCH /v1/apps/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Activate

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da app |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 404 | Not Found | App não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Ativação bem-sucedida
- **Dado que** app inativa
- **Quando** ativa
- **Então** isActive muda para true

## Componentes Frontend Sugeridos
- `AppStatusToggle`, `useActivateApp`
