---
id: STORY-014
title: "Ativar utilizador"
type: STORY
status: To do
resource: users
endpoint: PATCH /v1/users/{id}/activate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-014 — Ativar utilizador

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero ativar um utilizador inativo
Para que o utilizador possa voltar a aceder ao sistema

## Endpoint
`PATCH /v1/users/{id}/activate`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Users | Action: Activate

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do utilizador a ativar |

### Exemplo de Request
```
PATCH /v1/users/10/activate
```

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Utilizador não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Ativação bem-sucedida
- **Dado que** existe um utilizador inativo com o ID fornecido
- **Quando** o gestor clica em "Ativar"
- **Então** o utilizador fica ativo e o estado é atualizado na interface

### CA-02: Utilizador não encontrado
- **Dado que** o ID não existe
- **Quando** tenta ativar
- **Então** é exibida mensagem de erro 404

## Cenários BDD

### Cenário 1: Ativação bem-sucedida
```gherkin
Given existe utilizador id=10 com isActive=false
When o gestor clica em "Ativar" na linha do utilizador
Then o sistema envia PATCH /v1/users/10/activate
And o estado do utilizador muda para isActive=true
And a interface é atualizada
```

### Cenário 2: Utilizador já ativo
```gherkin
Given o utilizador id=10 já está ativo
When o gestor tenta ativar novamente
Then o sistema processa sem erros (idempotente)
```

## Componentes Frontend Sugeridos
- `UserStatusToggle` — botão de ativar/desativar na tabela
- `useActivateUser` — hook useMutation
- Invalidação de cache após sucesso (refetch da lista)

## Observações
- Ação idempotente: ativar utilizador já ativo não deve causar erro visível
