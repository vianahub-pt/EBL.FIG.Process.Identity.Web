---
id: STORY-061
title: "Atualizar aplicação"
type: STORY
status: For Deploy
resource: apps
endpoint: PUT /v1/apps/{id}
priority: Medium
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/apps-crud
pr: "pending-push"
---

# STORY-061 — Atualizar aplicação

## Endpoint
`PUT /v1/apps/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Update

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da app |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 200 chars | Nome da aplicação |
| description | string | Sim | max 500 chars | Descrição |

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 404 | Not Found | App não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atualização bem-sucedida
- **Dado que** a app existe e dados são válidos
- **Quando** submete
- **Então** a app é atualizada (204)

## Componentes Frontend Sugeridos
- `EditAppForm`, `useUpdateApp`
