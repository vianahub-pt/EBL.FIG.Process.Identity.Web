---
id: STORY-060
title: "Criar nova aplicação"
type: STORY
status: For Deploy
resource: apps
endpoint: POST /v1/apps/
priority: Medium
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/apps-crud
pr: "pending-push"
---

# STORY-060 — Criar nova aplicação

## Como utilizador com perfil Admin ou BackOffice
Eu quero criar uma nova aplicação
Para que o sistema possa gerir recursos e roles por aplicação

## Endpoint
`POST /v1/apps/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Apps | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 200 chars | Nome da aplicação |
| description | string | Sim | max 500 chars | Descrição da aplicação |

### Exemplo de Request
```json
{
  "name": "Portal Financeiro",
  "description": "Sistema de gestão financeira"
}
```

## Response

### Sucesso
**Status:** 201 Created

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Criação bem-sucedida
- **Dado que** name e description são válidos
- **Quando** submete
- **Então** a app é criada (201)

### CA-02: Campos obrigatórios
- **Dado que** name ou description estão em branco
- **Quando** submete
- **Então** são exibidos erros de validação

## Cenários BDD

### Cenário 1: Criação bem-sucedida
```gherkin
Given name="Portal Financeiro", description="Sistema financeiro"
When submete
Then app criada com status 201
```

## Componentes Frontend Sugeridos
- `CreateAppForm`, `useCreateApp`

## Observações
- name obrigatório, max 200 chars
- description obrigatório, max 500 chars
