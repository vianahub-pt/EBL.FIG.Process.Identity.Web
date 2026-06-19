---
id: STORY-031
title: "Atualizar ação"
type: STORY
status: For Deploy
resource: actions
endpoint: PUT /v1/actions/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-p
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-031 — Atualizar ação

## Como utilizador com perfil Admin ou BackOffice
Eu quero atualizar uma ação existente
Para que as informações da ação se mantenham atualizadas

## Endpoint
`PUT /v1/actions/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Actions | Action: Update

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID da ação |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 50 chars | Nome da ação |
| description | string | Sim | max 255 chars | Descrição da ação |

### Exemplo de Request
```json
{
  "name": "Export",
  "description": "Exportação de dados atualizada"
}
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
| 410 | Gone | Ação não encontrada |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atualização bem-sucedida
- **Dado que** a ação existe e os dados são válidos
- **Quando** submete
- **Então** a ação é atualizada

## Cenários BDD

### Cenário 1: Atualização bem-sucedida
```gherkin
Given existe ação id=1
When altera description e submete
Then a ação é atualizada com sucesso
```

## Componentes Frontend Sugeridos
- `EditActionForm`, `useUpdateAction`
