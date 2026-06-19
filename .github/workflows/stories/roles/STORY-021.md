---
id: STORY-021
title: "Criar novo papel (role)"
type: STORY
status: To do
resource: roles
endpoint: POST /v1/roles/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-021 — Criar novo papel (role)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero criar um novo papel no sistema
Para que possa definir perfis de acesso para os utilizadores

## Endpoint
`POST /v1/roles/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 100 chars | Nome do role |
| description | string | Não | max 255 chars | Descrição do role |

### Exemplo de Request
```json
{
  "name": "Supervisor",
  "description": "Papel de supervisão de operações"
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
| 409 | Conflict | Role com mesmo nome já existe |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Criação bem-sucedida
- **Dado que** os dados são válidos e o nome não existe
- **Quando** submete
- **Então** o role é criado (201)

### CA-02: Nome duplicado
- **Dado que** já existe um role com o mesmo nome
- **Quando** tenta criar
- **Então** é exibido erro 409 Conflict

### CA-03: Validação de campos
- **Dado que** name está em branco ou excede 100 chars
- **Quando** submete
- **Então** são exibidos erros de validação

## Cenários BDD

### Cenário 1: Criação bem-sucedida
```gherkin
Given o gestor preenche name="Supervisor" e description="Papel de supervisão"
When submete
Then role é criado com status 201
```

### Cenário 2: Nome duplicado
```gherkin
Given já existe role com name="Manager"
When tenta criar outro com name="Manager"
Then é exibido erro de conflito 409
```

## Componentes Frontend Sugeridos
- `CreateRoleForm` — formulário de criação
- `useCreateRole` — hook useMutation

## Observações
- name obrigatório, max 100 chars
- description opcional, max 255 chars
