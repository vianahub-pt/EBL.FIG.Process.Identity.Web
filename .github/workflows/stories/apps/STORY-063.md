---
id: STORY-063
title: "Desativar aplicação"
type: STORY
status: To do
resource: apps
endpoint: PATCH /v1/apps/{id}/deactivate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-063 — Desativar aplicação

## Endpoint
`PATCH /v1/apps/{id}/deactivate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Deactivate

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

### CA-01: Desativação bem-sucedida
- **Dado que** app ativa
- **Quando** desativa
- **Então** isActive muda para false

## Componentes Frontend Sugeridos
- `AppStatusToggle`, `ConfirmDialog`, `useDeactivateApp`
