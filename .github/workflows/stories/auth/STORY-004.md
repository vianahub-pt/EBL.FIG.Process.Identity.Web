---
id: STORY-004
title: "Terminar sessão do utilizador (logout)"
type: STORY
status: To do
resource: auth
endpoint: POST /v1/auth/logout
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-004 — Terminar sessão do utilizador (logout)

## Como utilizador autenticado
Eu quero terminar a minha sessão de forma segura
Para que a minha conta fique protegida após o uso

## Endpoint
`POST /v1/auth/logout`

## Autenticação
Sim — Bearer Token JWT (RequireAuthorization)

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| reason | string | Não | string | Motivo do logout (padrão: string vazia) |

### Exemplo de Request
```json
{
  "reason": "Utilizador terminou sessão manualmente"
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
| 401 | Unauthorized | Token inválido ou expirado |

## Critérios de Aceite

### CA-01: Logout bem-sucedido
- **Dado que** o utilizador está autenticado
- **Quando** clica em "Terminar sessão"
- **Então** a sessão é revogada no servidor e o utilizador é redirecionado para o login

### CA-02: Token inválido
- **Dado que** o token já expirou
- **Quando** tenta fazer logout
- **Então** o sistema limpa os tokens locais e redireciona para login

## Cenários BDD

### Cenário 1: Logout bem-sucedido
```gherkin
Given o utilizador está autenticado no sistema
When clica no botão de logout
Then é enviado POST /v1/auth/logout com o Bearer token
And os tokens locais são removidos
And o utilizador é redirecionado para /login
```

### Cenário 2: Sessão já expirada
```gherkin
Given o token do utilizador já expirou
When tenta fazer logout
Then os tokens locais são limpos de qualquer forma
And o utilizador é redirecionado para /login
```

## Componentes Frontend Sugeridos
- `LogoutButton` — botão de logout no header/navbar
- `useLogout` — hook que chama o endpoint e limpa o estado
- `AuthStore` (Zustand) — limpar dados de sessão após logout

## Observações
- Mesmo que o servidor retorne 401, o frontend deve limpar os tokens locais
- O campo `reason` é opcional e pode ser omitido pelo frontend
