---
id: STORY-011
title: "Criar novo utilizador"
type: STORY
status: To do
resource: users
endpoint: POST /v1/users/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-011 — Criar novo utilizador

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero criar um novo utilizador no sistema
Para que novas pessoas possam aceder à plataforma

## Endpoint
`POST /v1/users/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Users | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 200 chars | Nome completo do utilizador |
| secret | string | Sim | 8–100 chars, maiúscula, minúscula, dígito, especial | Palavra-passe |
| confirmSecret | string | Sim | deve ser igual a secret | Confirmação da palavra-passe |
| email | string | Não | max 500 chars | Email do utilizador |
| urlImage | string | Não | max 500 chars | URL da foto de perfil |

### Exemplo de Request
```json
{
  "name": "Maria Santos",
  "secret": "Senha@2024!",
  "confirmSecret": "Senha@2024!",
  "email": "maria.santos@empresa.com",
  "urlImage": "https://cdn.empresa.com/avatar/maria.png"
}
```

## Response

### Sucesso
**Status:** 201 Created
```json
{}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Criação bem-sucedida
- **Dado que** o gestor preenche todos os campos obrigatórios com dados válidos
- **Quando** submete o formulário
- **Então** o utilizador é criado (201) e é exibida mensagem de sucesso

### CA-02: Validação de campos obrigatórios
- **Dado que** o gestor tenta criar sem name ou secret
- **Quando** submete
- **Então** são exibidos erros de validação nos campos

### CA-03: Senhas não coincidem
- **Dado que** secret e confirmSecret são diferentes
- **Quando** submete
- **Então** é exibido erro no campo confirmSecret

## Cenários BDD

### Cenário 1: Criação bem-sucedida
```gherkin
Given o gestor está no formulário de criação
When preenche name="Maria Santos", secret="Senha@2024!", confirmSecret="Senha@2024!"
And submete
Then o utilizador é criado
And uma mensagem de sucesso é exibida
```

### Cenário 2: Senha fraca
```gherkin
Given o gestor preenche secret="senha123"
When submete o formulário
Then é exibido erro indicando que a senha não cumpre os requisitos de complexidade
```

### Cenário 3: Senhas divergentes
```gherkin
Given secret="Senha@1!" e confirmSecret="Senha@2!"
When submete
Then o campo confirmSecret exibe erro de não coincidência
```

## Componentes Frontend Sugeridos
- `CreateUserForm` — formulário de criação
- `PasswordStrengthIndicator` — indicador de força da senha
- `useCreateUser` — hook useMutation

## Observações
- Validação no frontend com Zod (senha mínimo 8 chars, maiúscula, minúscula, dígito, especial)
- O endpoint não requer TenantId no body — o tenant é inferido do contexto de autenticação
