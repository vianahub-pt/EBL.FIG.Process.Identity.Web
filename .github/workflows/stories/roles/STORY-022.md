---
id: STORY-022
title: "Atualizar papel (role)"
type: STORY
status: For Deploy
resource: roles
endpoint: PUT /v1/roles/{id}
priority: Medium
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/roles-crud
pr: ""
---

# STORY-022 — Atualizar papel (role)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero atualizar um papel existente
Para que as informações do role se mantenham atualizadas

## Endpoint
`PUT /v1/roles/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Roles | Action: Update

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do role |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 100 chars | Nome do role |
| description | string | Não | max 255 chars | Descrição do role |

### Exemplo de Request
```json
{
  "name": "Supervisor Senior",
  "description": "Papel de supervisão sénior"
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
| 410 | Gone | Role não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atualização bem-sucedida
- **Dado que** o role existe e os dados são válidos
- **Quando** submete a atualização
- **Então** os dados são atualizados

### CA-02: Role não encontrado
- **Dado que** o ID não existe
- **Quando** tenta atualizar
- **Então** é exibido erro 410 Gone

## Cenários BDD

### Cenário 1: Atualização bem-sucedida
```gherkin
Given existe role id=1
When o gestor altera name="Supervisor Senior" e submete
Then o role é atualizado
```

## Componentes Frontend Sugeridos
- `EditRoleForm` — formulário de edição pré-preenchido
- `useUpdateRole` — hook useMutation
