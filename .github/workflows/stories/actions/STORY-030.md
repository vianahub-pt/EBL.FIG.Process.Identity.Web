---
id: STORY-030
title: "Criar nova ação"
type: STORY
status: For Deploy
resource: actions
endpoint: POST /v1/actions/
priority: Medium
created_at: 2026-06-16
author: po
developer: dev-p
branch: feature/actions-crud
pr: ""
updated_at: 2026-06-16
---

# STORY-030 — Criar nova ação

## Como utilizador com perfil Admin ou BackOffice
Eu quero criar uma nova ação no sistema
Para que possa definir as operações que os papéis podem executar

## Endpoint
`POST /v1/actions/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Actions | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| appId | int | Sim | > 0 | ID da aplicação à qual a ação pertence |
| name | string | Sim | max 50 chars | Nome da ação (ex: Read, Create) |
| description | string | Sim | max 255 chars | Descrição da ação |

### Exemplo de Request
```json
{
  "appId": 2,
  "name": "Export",
  "description": "Permissão de exportação de dados"
}
```

## Response

### Sucesso
**Status:** 201 Created

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 409 | Conflict | Ação com mesmo nome já existe |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Criação bem-sucedida
- **Dado que** appId > 0, name e description são válidos
- **Quando** submete
- **Então** a ação é criada (201)

### CA-02: Nome duplicado
- **Dado que** já existe ação com o mesmo nome para a app
- **Quando** tenta criar
- **Então** é exibido erro 409

### CA-03: Campos obrigatórios
- **Dado que** name ou description estão em branco
- **Quando** submete
- **Então** são exibidos erros de validação

## Cenários BDD

### Cenário 1: Criação bem-sucedida
```gherkin
Given appId=2, name="Export", description="Exportação de dados"
When submete o formulário
Then a ação é criada com status 201
```

### Cenário 2: Nome duplicado
```gherkin
Given já existe ação "Read" na app 2
When tenta criar outra com name="Read" e appId=2
Then é exibido erro 409 Conflict
```

## Componentes Frontend Sugeridos
- `CreateActionForm`, `useCreateAction`

## Observações
- name obrigatório, max 50 chars
- description obrigatório, max 255 chars
- appId obrigatório e > 0
