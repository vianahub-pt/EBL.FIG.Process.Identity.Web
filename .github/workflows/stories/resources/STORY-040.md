---
id: STORY-040
title: "Atualizar recurso"
type: STORY
status: To do
resource: resources
endpoint: PUT /v1/resources/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-040 — Atualizar recurso

## Endpoint
`PUT /v1/resources/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Update

## Request

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do recurso |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 100 chars | Nome do recurso |
| description | string | Não | max 255 chars | Descrição |

### Exemplo de Request
```json
{ "name": "Reports Updated", "description": "Módulo de relatórios atualizado" }
```

## Response

### Sucesso
**Status:** 200 OK

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 410 | Gone | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atualização bem-sucedida
- **Dado que** o recurso existe e dados são válidos
- **Quando** submete
- **Então** o recurso é atualizado

## Cenários BDD

### Cenário 1: Atualização
```gherkin
Given existe recurso id=1
When altera name e submete
Then o recurso é atualizado
```

## Componentes Frontend Sugeridos
- `EditResourceForm`, `useUpdateResource`
