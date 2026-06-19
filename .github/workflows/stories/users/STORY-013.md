---
id: STORY-013
title: "Alterar palavra-passe do utilizador"
type: STORY
status: To do
resource: users
endpoint: PATCH /v1/users/{id}/password
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-013 — Alterar palavra-passe do utilizador

## Como utilizador com perfil Admin, BackOffice, Manager ou User
Eu quero alterar a palavra-passe de um utilizador
Para que a segurança da conta seja mantida

## Endpoint
`PATCH /v1/users/{id}/password`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager, User | Resource: Users | Action: Update

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do utilizador |

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| currentSecret | string | Sim | não vazio | Palavra-passe atual |
| newSecret | string | Sim | não vazio | Nova palavra-passe |

### Exemplo de Request
```json
{
  "currentSecret": "SenhaAtual@2024!",
  "newSecret": "NovaSenha@2025!"
}
```

## Response

### Sucesso
**Status:** 204 No Content

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Senha atual incorreta ou validação falhou |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Utilizador não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Alteração bem-sucedida
- **Dado que** o utilizador fornece a senha atual correta e uma nova senha válida
- **Quando** submete o formulário
- **Então** a senha é alterada (204) e é exibida mensagem de sucesso

### CA-02: Senha atual incorreta
- **Dado que** o utilizador fornece uma senha atual incorreta
- **Quando** submete
- **Então** é exibida mensagem de erro de autenticação

### CA-03: Utilizador não encontrado
- **Dado que** o ID não existe
- **Quando** tenta alterar
- **Então** é exibida mensagem de erro 404

## Cenários BDD

### Cenário 1: Alteração de senha bem-sucedida
```gherkin
Given o utilizador está no formulário de alteração de senha
When preenche currentSecret="SenhaAtual@2024!" e newSecret="NovaSenha@2025!" e submete
Then a senha é alterada
And é exibida mensagem de sucesso
```

### Cenário 2: Senha atual errada
```gherkin
Given o utilizador fornece currentSecret incorreta
When submete
Then é exibido erro de autenticação
```

## Componentes Frontend Sugeridos
- `ChangePasswordForm` — formulário com campos currentSecret e newSecret
- `useUpdateUserPassword` — hook useMutation
- `PasswordStrengthIndicator` — indicador para nova senha

## Observações
- O papel "User" também pode alterar a própria senha (autoatendimento)
- Usar o endpoint de reset-password para recuperação sem a senha atual
