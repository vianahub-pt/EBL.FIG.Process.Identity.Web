---
id: STORY-048
title: "Criar permissão de papel (role permission)"
type: STORY
status: To do
resource: role-permissions
endpoint: POST /v1/role-permissions/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-048 — Criar permissão de papel (role permission)

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero atribuir uma permissão (recurso + ação) a um papel
Para que o papel tenha acesso controlado às funcionalidades

## Endpoint
`POST /v1/role-permissions/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: RolePermissions | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| roleId | int | Sim | > 0 | ID do papel |
| resourceId | int | Sim | > 0 | ID do recurso |
| actionId | int | Sim | > 0 | ID da ação |

### Exemplo de Request
```json
{
  "roleId": 3,
  "resourceId": 1,
  "actionId": 2
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
- **Dado que** roleId, resourceId e actionId são válidos
- **Quando** submete
- **Então** a permissão é criada (201)

### CA-02: IDs inválidos
- **Dado que** algum ID não existe
- **Quando** submete
- **Então** é exibida mensagem de erro

## Cenários BDD

### Cenário 1: Criação de permissão
```gherkin
Given roleId=3, resourceId=1, actionId=2 existem
When submete o formulário
Then permissão é criada com status 201
```

## Componentes Frontend Sugeridos
- `CreateRolePermissionForm` — dropdowns para selecionar role, resource, action
- `useCreateRolePermission`
