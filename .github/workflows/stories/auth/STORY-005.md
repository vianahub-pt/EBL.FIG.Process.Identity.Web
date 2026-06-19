---
id: STORY-005
title: "Solicitar recuperação de palavra-passe"
type: STORY
status: To do
resource: auth
endpoint: POST /v1/auth/forgot-password
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-005 — Solicitar recuperação de palavra-passe

## Como utilizador
Eu quero solicitar a recuperação da minha palavra-passe
Para que possa voltar a aceder à minha conta caso a tenha esquecido

## Endpoint
`POST /v1/auth/forgot-password`

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
| loginIdentifier | string | Sim | não vazio | Identificador do utilizador (nome ou email) |

### Exemplo de Request
```json
{
  "loginIdentifier": "joao.silva"
}
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "message": "Se existir uma conta com este identificador, receberá instruções de recuperação."
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | loginIdentifier em falta ou inválido |

## Critérios de Aceite

### CA-01: Solicitação com identificador válido
- **Dado que** o utilizador preenche o loginIdentifier
- **Quando** submete o formulário
- **Então** é exibida mensagem genérica de confirmação (independente de o utilizador existir)

### CA-02: Campo obrigatório
- **Dado que** o utilizador deixa o loginIdentifier em branco
- **Quando** submete o formulário
- **Então** exibe erro de validação no campo

## Cenários BDD

### Cenário 1: Pedido de recuperação enviado
```gherkin
Given o utilizador está na página "Esqueci a senha"
When preenche loginIdentifier="joao.silva" e submete
Then o sistema processa o pedido
And exibe a mensagem de confirmação da resposta
```

### Cenário 2: Campo vazio
```gherkin
Given o utilizador está na página "Esqueci a senha"
When submete o formulário com loginIdentifier vazio
Then o campo exibe "Identificador de login é obrigatório"
```

## Componentes Frontend Sugeridos
- `ForgotPasswordForm` — formulário com campo loginIdentifier
- `FormField` — wrapper com exibição de erro

## Observações
- Rate limiting aplicado (política "authentication")
- A resposta é sempre positiva por razões de segurança (não revelar se o utilizador existe)
