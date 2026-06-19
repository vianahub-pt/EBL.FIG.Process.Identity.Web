---
id: STORY-006
title: "Validar token de redefinição de palavra-passe"
type: STORY
status: To do
resource: auth
endpoint: GET /v1/auth/reset-password/validate
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-006 — Validar token de redefinição de palavra-passe

## Como utilizador
Eu quero validar o token de redefinição de palavra-passe recebido por email
Para que saiba se o link de recuperação ainda é válido antes de preencher a nova senha

## Endpoint
`GET /v1/auth/reset-password/validate`

## Autenticação
Não — endpoint público (AllowAnonymous)

## Request

### Headers
```
(sem headers especiais)
```

### Query Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| token | string | Sim | Token de redefinição recebido por email |

### Exemplo de Request
```
GET /v1/auth/reset-password/validate?token=abc123xyz...
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "isValid": true
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Token em falta ou inválido |

## Critérios de Aceite

### CA-01: Token válido
- **Dado que** o utilizador acede ao link de redefinição com token válido
- **Quando** a página carrega e valida o token
- **Então** exibe o formulário de nova palavra-passe

### CA-02: Token inválido ou expirado
- **Dado que** o token não é válido ou já expirou
- **Quando** a página tenta validar
- **Então** exibe mensagem de erro e opção para solicitar novo link

## Cenários BDD

### Cenário 1: Token válido
```gherkin
Given o utilizador acede ao link de redefinição de senha
When a página carrega com token válido na query string
Then a API retorna isValid=true
And o formulário de nova senha é apresentado
```

### Cenário 2: Token expirado
```gherkin
Given o utilizador acede ao link com token expirado
When a validação é feita
Then isValid=false é retornado
And é exibida mensagem de "Link expirado" com opção de reenviar
```

## Componentes Frontend Sugeridos
- `ResetPasswordPage` — página que valida o token ao montar
- `useValidateResetToken` — hook useQuery para validar o token
- `InvalidTokenMessage` — componente de erro com call-to-action

## Observações
- Esta validação deve ocorrer automaticamente ao carregar a página de redefinição
- O token é enviado como query parameter (AsParameters)
