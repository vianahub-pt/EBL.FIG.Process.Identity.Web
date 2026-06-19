---
id: STORY-003
title: "Renovar token de acesso (refresh token)"
type: STORY
status: To do
resource: auth
endpoint: POST /v1/auth/refresh
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-003 — Renovar token de acesso (refresh token)

## Como utilizador autenticado
Eu quero renovar o meu token de acesso automaticamente
Para que a minha sessão não expire durante o uso da aplicação

## Endpoint
`POST /v1/auth/refresh`

## Autenticação
Não — endpoint público (AllowAnonymous), sujeito a rate limiting (política "refreshtoken")

## Request

### Headers
```
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| tenantId | int | Sim | > 0 | ID do tenant da sessão atual |
| refreshToken | string | Sim | não vazio | Refresh token emitido no login |

### Exemplo de Request
```json
{
  "tenantId": 1,
  "refreshToken": "d2b6a1c3-8e4f-4a2b-b1c5-9d3e7f8a6b2c"
}
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "e3c7b2d4-...",
  "accessTokenExpiresAt": "2026-06-16T14:00:00Z",
  "refreshTokenExpiresAt": "2026-06-23T08:00:00Z",
  "tenantId": 1,
  "tenantName": "Empresa Exemplo",
  "appId": 2,
  "appName": "Portal RH",
  "userId": 10,
  "userName": "João Silva",
  "roleId": 3,
  "roleName": "Manager"
}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Campos em falta ou inválidos |
| 401 | Unauthorized | Refresh token inválido ou expirado |

## Critérios de Aceite

### CA-01: Renovação bem-sucedida
- **Dado que** o utilizador possui refresh token válido
- **Quando** o frontend detecta que o accessToken está prestes a expirar
- **Então** é emitido novo accessToken e refreshToken

### CA-02: Refresh token expirado
- **Dado que** o refresh token expirou
- **Quando** o frontend tenta renovar a sessão
- **Então** recebe 401 e é redirecionado para a página de login

## Cenários BDD

### Cenário 1: Renovação automática bem-sucedida
```gherkin
Given o utilizador está autenticado e o accessToken está a expirar
When o frontend chama o endpoint de refresh com o refreshToken válido
Then é recebido novo accessToken
And a sessão continua ativa sem interrupção
```

### Cenário 2: Refresh token inválido
```gherkin
Given o utilizador possui um refreshToken inválido ou expirado
When tenta renovar a sessão
Then o sistema retorna 401
And o utilizador é redirecionado para login
```

## Componentes Frontend Sugeridos
- `useRefreshToken` — hook que intercepta respostas 401 e tenta renovar o token
- `AuthStore` (Zustand) — atualizar tokens em estado global
- Axios interceptor para refresh automático

## Observações
- Rate limiting específico para refresh (política "refreshtoken")
- O novo refreshToken substitui o anterior
- Implementar lógica de retry automático no cliente Axios
