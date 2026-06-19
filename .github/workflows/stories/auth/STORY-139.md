---
id: STORY-139
title: "Página de Login — autenticação com credenciais"
type: STORY
status: For Tests
resource: auth
endpoint: POST /v1/auth/login
priority: High
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-p
branch: feature/story-139-login-page
pr: ""
---

# STORY-139 — Página de Login

## Como utilizador
Eu quero aceder à página de login e autenticar-me com as minhas credenciais
Para que possa entrar no sistema e aceder às funcionalidades da plataforma

## Depende de
- TASK-138 (scaffolding do projeto concluído)

## Endpoint
`POST /v1/auth/login`

## Autenticação
Não — endpoint público

## Request Body
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| loginIdentifier | string | Sim | Nome de utilizador ou email |
| password | string | Sim | Palavra-passe |

## Response de Sucesso (200 OK)
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "uuid",
  "accessTokenExpiresAt": "2026-06-16T12:00:00Z",
  "refreshTokenExpiresAt": "2026-06-23T08:00:00Z",
  "tenantId": 1,
  "tenantName": "Empresa Exemplo",
  "userId": 10,
  "name": "João Silva",
  "urlImage": "https://...",
  "roles": ["admin", "user"]
}
```

## UI — Especificação

### Layout Mobile-First
- **Mobile (base):** formulário centrado em coluna única, ocupa 100% da largura
- **Tablet (md):** card centrado com largura máxima de 400px
- **Desktop (lg):** split-screen — lado esquerdo com branding/imagem, lado direito com formulário

### Componentes (shadcn/ui)
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- `Input` (para loginIdentifier e password)
- `Button` (submit, com estado de loading)
- Toggle de idioma (pt-BR / en-US) — visible no topo da página
- Toggle de tema (claro/escuro) — visible no topo da página

### Campos do Formulário
| Campo | Label (pt-BR) | Label (en-US) | Tipo input | Placeholder |
|-------|--------------|--------------|-----------|-------------|
| loginIdentifier | "Utilizador ou Email" | "Username or Email" | text | "Digite seu utilizador ou email" |
| password | "Palavra-passe" | "Password" | password | "Digite sua palavra-passe" |

### Validação com Zod (client-side)
- `loginIdentifier`: obrigatório, não vazio, trim
- `password`: obrigatório, não vazio

### Comportamentos
1. Ao submeter: botão mostra estado de loading (`disabled + spinner`)
2. Sucesso (200): guardar tokens e dados do utilizador no `auth.store`, redirecionar para `/{locale}/` (home/dashboard)
3. Erro 401/400: exibir mensagem de erro inline sob o formulário (toast ou alert)
4. Campos validados em tempo real com React Hook Form

### Textos i18n
Adicionar em `messages/pt-BR.json`:
```json
{
  "auth": {
    "login": {
      "title": "Entrar na plataforma",
      "subtitle": "Bem-vindo de volta",
      "loginIdentifier": "Utilizador ou Email",
      "loginIdentifierPlaceholder": "Digite seu utilizador ou email",
      "password": "Palavra-passe",
      "passwordPlaceholder": "Digite sua palavra-passe",
      "submit": "Entrar",
      "loading": "A autenticar...",
      "error": {
        "invalidCredentials": "Credenciais inválidas. Verifique o utilizador e a palavra-passe.",
        "generic": "Ocorreu um erro. Tente novamente."
      }
    }
  }
}
```
Adicionar equivalente em `messages/en-US.json`.

## Ficheiros a Criar/Alterar
- `src/app/[locale]/(auth)/login/page.tsx`
- `src/app/[locale]/(auth)/layout.tsx` (layout sem sidebar/navbar — apenas para páginas públicas)
- `src/hooks/use-auth.ts` (useMutation para POST /v1/auth/login + lógica de redirect)
- `src/services/auth.service.ts` (chamada HTTP ao endpoint)
- `src/lib/schemas/login.schema.ts` (schema Zod)
- `src/types/auth.types.ts` (tipos do request/response de auth)
- `messages/pt-BR.json` (actualizar com chaves de auth.login)
- `messages/en-US.json` (actualizar com chaves de auth.login)

## Critérios de Aceite

### CA-01: Login com credenciais válidas
- **Dado que** o utilizador está na página de login
- **Quando** preenche loginIdentifier e password correctos e clica "Entrar"
- **Então** é redirecionado para o dashboard

### CA-02: Login com credenciais inválidas
- **Dado que** o utilizador está na página de login
- **Quando** preenche credenciais erradas
- **Então** exibe mensagem de erro sem redirecionar

### CA-03: Validação de campos obrigatórios
- **Dado que** o utilizador não preencheu os campos
- **Quando** tenta submeter
- **Então** exibe mensagens de erro inline nos campos

### CA-04: Estado de loading
- **Dado que** o utilizador clicou em "Entrar"
- **Quando** o pedido está em curso
- **Então** o botão mostra spinner e fica desabilitado

### CA-05: Responsividade Mobile-First
- **Dado que** o utilizador acede em smartphone
- **Quando** a página carrega
- **Então** o formulário ocupa toda a largura e é usável com o polegar

### CA-06: Mudança de idioma
- **Dado que** o utilizador clica no toggle de idioma
- **Quando** selecciona en-US
- **Então** todos os labels e mensagens mudam para inglês sem recarregar a página

### CA-07: Tema claro/escuro
- **Dado que** o utilizador está na página de login
- **Quando** alterna o tema
- **Então** a página muda de tema corretamente

## Cenários BDD

### Cenário 1: Login bem-sucedido
```gherkin
Given o utilizador está na página "/pt-BR/login"
When preenche loginIdentifier com "admin" e password com "Admin@123!"
And clica no botão "Entrar"
Then o sistema chama POST /v1/auth/login
And recebe 200 OK com accessToken
And guarda os tokens no auth.store
And redireciona para "/pt-BR/"
```

### Cenário 2: Credenciais inválidas
```gherkin
Given o utilizador está na página de login
When preenche credenciais erradas
And clica em "Entrar"
Then o sistema recebe 400 ou 401
And exibe mensagem de erro "Credenciais inválidas"
And permanece na página de login
```

### Cenário 3: Campos em branco
```gherkin
Given o utilizador está na página de login
When clica em "Entrar" sem preencher nada
Then exibe erro "Campo obrigatório" em cada campo vazio
And não faz chamada à API
```
