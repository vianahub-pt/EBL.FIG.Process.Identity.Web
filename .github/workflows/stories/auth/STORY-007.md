---
id: STORY-007
title: "Redefinir palavra-passe com token"
type: STORY
status: To do
resource: auth
endpoint: POST /v1/auth/reset-password
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-007 — Redefinir palavra-passe com token

## Como utilizador
Eu quero redefinir a minha palavra-passe usando o token recebido por email
Para que possa recuperar o acesso à minha conta

## Endpoint
`POST /v1/auth/reset-password`

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
| token | string | Sim | não vazio | Token de redefinição recebido por email |
| newPassword | string | Sim | não vazio | Nova palavra-passe |
| confirmPassword | string | Sim | deve ser igual a newPassword | Confirmação da nova palavra-passe |

### Exemplo de Request
```json
{
  "token": "abc123xyz...",
  "newPassword": "NovaSenha@2024!",
  "confirmPassword": "NovaSenha@2024!"
}
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "message": "Palavra-passe redefinida com sucesso."
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Campos inválidos ou senhas não coincidem |
| 409 | Conflict | Token já foi utilizado |
| 410 | Gone | Token expirado ou não encontrado |

## Critérios de Aceite

### CA-01: Redefinição bem-sucedida
- **Dado que** o utilizador preenche nova senha e confirmação com token válido
- **Quando** submete o formulário
- **Então** a senha é alterada e é exibida mensagem de sucesso com redirecionamento para login

### CA-02: Senhas não coincidem
- **Dado que** o utilizador preenche newPassword e confirmPassword com valores diferentes
- **Quando** submete o formulário
- **Então** exibe erro no campo confirmPassword

### CA-03: Token inválido
- **Dado que** o token é inválido ou expirado
- **Quando** submete o formulário
- **Então** é exibida mensagem de erro adequada (410 Gone)

## Cenários BDD

### Cenário 1: Redefinição bem-sucedida
```gherkin
Given o utilizador está na página de redefinição com token válido
When preenche newPassword="NovaSenha@2024!" e confirmPassword="NovaSenha@2024!"
And submete o formulário
Then a senha é alterada com sucesso
And o utilizador é redirecionado para a página de login
```

### Cenário 2: Confirmação de senha diferente
```gherkin
Given o utilizador está no formulário de redefinição
When preenche newPassword="Senha@1" e confirmPassword="Senha@2"
Then o campo confirmPassword exibe erro de não coincidência
```

### Cenário 3: Token já utilizado
```gherkin
Given o token já foi utilizado anteriormente
When o utilizador tenta redefinir a senha
Then o sistema retorna 409 e exibe mensagem de "Link já utilizado"
```

## Componentes Frontend Sugeridos
- `ResetPasswordForm` — formulário com campos newPassword e confirmPassword
- `PasswordStrengthIndicator` — indicador de força da senha
- `useResetPassword` — hook useMutation

## Observações
- Rate limiting aplicado (política "authentication")
- O IP e User-Agent são capturados pelo servidor automaticamente (HttpContext)
- Após sucesso, redirecionar para /login com mensagem de confirmação
