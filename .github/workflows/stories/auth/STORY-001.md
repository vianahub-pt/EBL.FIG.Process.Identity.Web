---
id: STORY-001
title: "Registar novo utilizador no sistema"
type: STORY
status: To do
resource: auth
endpoint: POST /v1/auth/register
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-001 — Registar novo utilizador no sistema

## Como utilizador
Eu quero registar uma nova conta no sistema
Para que possa aceder às funcionalidades da plataforma

## Endpoint
`POST /v1/auth/register`

## Autenticação
Não — endpoint público (AllowAnonymous), sujeito a rate limiting

## Request

### Headers
```
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| tenantId | int | Sim | > 0 | ID do tenant ao qual o utilizador pertence |
| name | string | Sim | max 200 | Nome do utilizador |
| secret | string | Sim | 9–100 chars, maiúscula, minúscula, dígito, especial, não pode ser senha comum | Palavra-passe |
| email | string | Não | max 500 | Email do utilizador |
| urlImage | string | Não | max 500 | URL da imagem de perfil |

### Exemplo de Request
```json
{
  "tenantId": 1,
  "name": "João Silva",
  "secret": "Senha@2024!",
  "email": "joao.silva@empresa.com",
  "urlImage": "https://cdn.empresa.com/avatar/joao.png"
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
| 400 | Bad Request | Campos obrigatórios em falta ou validação falhou |
| 409 | Conflict | Utilizador já existe para este tenant |

## Critérios de Aceite

### CA-01: Registo com dados válidos
- **Dado que** o utilizador preenche todos os campos obrigatórios com dados válidos
- **Quando** submete o formulário de registo
- **Então** a conta é criada com sucesso e é exibida mensagem de confirmação

### CA-02: Validação de campos obrigatórios
- **Dado que** o utilizador preenche o formulário
- **Quando** submete sem o tenantId, name ou secret
- **Então** exibe mensagens de erro de validação inline nos campos correspondentes

### CA-03: Validação da palavra-passe
- **Dado que** o utilizador preenche o campo secret
- **Quando** a senha não cumpre os requisitos (min 9 chars, maiúscula, minúscula, dígito, especial)
- **Então** exibe mensagem de erro descritiva informando o requisito não cumprido

### CA-04: Utilizador duplicado
- **Dado que** já existe uma conta com o mesmo identificador no tenant
- **Quando** tenta registar novamente
- **Então** exibe mensagem de erro de conflito (409)

## Cenários BDD

### Cenário 1: Registo bem-sucedido
```gherkin
Given o utilizador está na página de registo
When preenche tenantId=1, name="João Silva", secret="Senha@2024!", email="joao@emp.com"
Then o sistema cria a conta
And exibe mensagem de sucesso
```

### Cenário 2: Palavra-passe sem caractere especial
```gherkin
Given o utilizador está na página de registo
When preenche secret="SenhaSimples1"
Then o campo secret exibe erro "A senha deve conter pelo menos um caractere especial"
```

### Cenário 3: Utilizador já registado
```gherkin
Given já existe conta com o mesmo nome no tenant
When o utilizador tenta registar novamente
Then o sistema exibe erro 409 indicando conflito
```

## Componentes Frontend Sugeridos
- `RegisterForm` — formulário de registo com validação React Hook Form + Zod
- `PasswordStrengthIndicator` — componente de força da senha
- `FormField` — wrapper de campo com exibição de erro

## Observações
- Rate limiting aplicado ao endpoint (política "authentication")
- Senha comum é rejeitada (ex: "123456", "password")
- TenantId deve ser > 0
