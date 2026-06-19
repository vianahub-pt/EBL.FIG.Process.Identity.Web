---
id: STORY-002
title: "Autenticar utilizador com credenciais (login)"
type: STORY
status: To do
resource: auth
endpoint: POST /v1/auth/login
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-002 — Autenticar utilizador com credenciais (login)

## Como utilizador
Eu quero fazer login com as minhas credenciais
Para que possa aceder ao sistema com o meu perfil

## Endpoint
`POST /v1/auth/login`

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
| password | string | Sim | não vazio | Palavra-passe do utilizador |

### Exemplo de Request
```json
{
  "loginIdentifier": "joao.silva",
  "password": "Senha@2024!"
}
```

## Response

### Sucesso
**Status:** 200 OK
```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "d2b6a1c3-...",
  "accessTokenExpiresAt": "2026-06-16T12:00:00Z",
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
| 400 | Bad Request | Campos obrigatórios em falta |
| 401 | Unauthorized | Credenciais inválidas |

## Critérios de Aceite

### CA-01: Login com credenciais válidas
- **Dado que** o utilizador possui conta ativa
- **Quando** submete loginIdentifier e password corretos
- **Então** recebe accessToken, refreshToken e dados do utilizador autenticado

### CA-02: Credenciais inválidas
- **Dado que** o utilizador submete credenciais incorretas
- **Quando** a API retorna 401
- **Então** exibe mensagem de erro "Credenciais inválidas"

### CA-03: Campos obrigatórios em falta
- **Dado que** o utilizador deixa campos em branco
- **Quando** submete o formulário
- **Então** exibe erros de validação inline

## Cenários BDD

### Cenário 1: Login bem-sucedido
```gherkin
Given o utilizador está na página de login
When preenche loginIdentifier="joao.silva" e password="Senha@2024!" e submete
Then é redirecionado para o dashboard
And o accessToken é armazenado para autenticação futura
```

### Cenário 2: Senha incorreta
```gherkin
Given o utilizador está na página de login
When preenche loginIdentifier="joao.silva" e password="senha-errada"
Then o sistema exibe mensagem de erro 401
And o utilizador permanece na página de login
```

### Cenário 3: Campo loginIdentifier vazio
```gherkin
Given o utilizador está na página de login
When submete sem preencher o loginIdentifier
Then o campo exibe "Identificador de login é obrigatório"
```

## Componentes Frontend Sugeridos
- `LoginForm` — formulário de login com React Hook Form + Zod
- `FormField` — wrapper de campo com exibição de erro
- `AuthStore` (Zustand) — armazenar tokens e dados do utilizador autenticado

## Observações
- Rate limiting aplicado (política "authentication")
- O accessToken deve ser guardado de forma segura (httpOnly cookie ou sessionStorage)
- Retorna `AuthDetailResponse` com todos os dados de sessão
