---
id: STORY-012
title: "Atualizar dados do utilizador"
type: STORY
status: To do
resource: users
endpoint: PUT /v1/users/{id}
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-012 — Atualizar dados do utilizador

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero atualizar os dados de um utilizador
Para que as informações do utilizador se mantenham atualizadas

## Endpoint
`PUT /v1/users/{id}`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Users | Action: Update

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do utilizador a atualizar |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Não | max 200 chars | Nome do utilizador |
| urlImage | string | Não | max 500 chars | URL da foto de perfil |

### Exemplo de Request
```json
{
  "name": "João Silva Atualizado",
  "urlImage": "https://cdn.empresa.com/avatar/joao-novo.png"
}
```

## Response

### Sucesso
**Status:** 200 OK
```json
{}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Utilizador não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Atualização bem-sucedida
- **Dado que** o utilizador existe e os dados são válidos
- **Quando** o gestor submete a atualização
- **Então** os dados são atualizados e é exibida mensagem de sucesso

### CA-02: Utilizador não encontrado
- **Dado que** o ID não existe
- **Quando** tenta atualizar
- **Então** é exibida mensagem de erro 404

### CA-03: Validação de tamanho
- **Dado que** o gestor digita um nome com mais de 200 caracteres
- **Quando** submete
- **Então** é exibido erro de validação no campo name

## Cenários BDD

### Cenário 1: Atualização bem-sucedida
```gherkin
Given o gestor está no formulário de edição do utilizador id=10
When altera o name para "João Atualizado" e submete
Then o utilizador é atualizado
And os dados refletem a alteração na lista
```

### Cenário 2: Nome demasiado longo
```gherkin
Given o gestor digita um nome com mais de 200 caracteres
When submete o formulário
Then o campo name exibe erro de comprimento máximo
```

## Componentes Frontend Sugeridos
- `EditUserForm` — formulário de edição pré-preenchido
- `useUpdateUser` — hook useMutation com PUT
- `ImageUrlField` — campo com preview da imagem

## Observações
- Apenas name e urlImage podem ser alterados neste endpoint
- Para alterar a senha, usar PATCH /{id}/password
