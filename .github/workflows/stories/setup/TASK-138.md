---
id: TASK-138
title: "Scaffolding do projeto Next.js com shadcn/ui, i18n e tema claro/escuro"
type: TASK
status: For Tests
resource: setup
priority: High
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-s
branch: feature/task-138-project-scaffolding
pr: ""
---

# TASK-138 — Scaffolding do projeto Next.js com shadcn/ui, i18n e tema claro/escuro

## Objetivo
Inicializar o projeto frontend **EBL.FIG.Process.Identity.Web** com toda a infraestrutura técnica necessária para o desenvolvimento das features:

- Next.js 14+ com App Router e TypeScript
- Tailwind CSS
- shadcn/ui como biblioteca de componentes
- next-intl para internacionalização (pt-BR e en-US)
- next-themes para tema claro/escuro
- Zustand para estado global
- React Query (TanStack Query v5) + Axios para chamadas à API
- React Hook Form + Zod para formulários

## Tarefas Técnicas

### 1. Inicializar o projeto Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. Instalar e configurar shadcn/ui
```bash
npx shadcn@latest init
```
Seleccionar:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

Componentes iniciais a adicionar:
```bash
npx shadcn@latest add button input label form card dropdown-menu avatar badge toast sonner separator skeleton tabs navigation-menu sheet sidebar
```

### 3. Instalar dependências
```bash
npm install next-intl next-themes @tanstack/react-query axios zustand react-hook-form @hookform/resolvers zod recharts lucide-react
npm install -D @types/node
```

### 4. Estrutura de pastas a criar
```
src/
  app/
    [locale]/
      (auth)/
        login/
          page.tsx
      (protected)/
        layout.tsx
        page.tsx (dashboard/home)
      layout.tsx
      globals.css
  components/
    ui/          ← gerado pelo shadcn
    features/
    layout/
  hooks/
  services/
  stores/
  lib/
    schemas/
  types/
messages/
  pt-BR.json
  en-US.json
```

### 5. Configurar next-intl
- Criar `src/i18n/routing.ts` com locales: `['pt-BR', 'en-US']` e defaultLocale: `'pt-BR'`
- Criar `src/i18n/request.ts` para carregar as mensagens
- Configurar `next.config.ts` com o plugin do next-intl
- Criar `middleware.ts` na raiz de `src/` para roteamento de locale
- Criar `messages/pt-BR.json` e `messages/en-US.json` com estrutura base

### 6. Configurar next-themes
- Criar `src/components/layout/ThemeProvider.tsx` com `ThemeProvider` do next-themes
- Wrap do layout raiz com `ThemeProvider` (attribute="class", defaultTheme="system", enableSystem)

### 7. Configurar React Query
- Criar `src/lib/query-client.ts`
- Criar `src/components/layout/QueryProvider.tsx`

### 8. Configurar Axios
- Criar `src/lib/axios.ts` com:
  - baseURL a partir de `NEXT_PUBLIC_API_URL` do `.env.local`
  - interceptor de request para adicionar `Authorization: Bearer {token}` do store Zustand
  - interceptor de response para refresh token automático (401 → chama POST /v1/auth/refresh → retry)

### 9. Configurar store de autenticação (Zustand)
- Criar `src/stores/auth.store.ts` com:
  - `accessToken`, `refreshToken`, `user`, `tenantId`
  - actions: `setAuth`, `clearAuth`, `setTokens`
  - persist no localStorage

### 10. Configurar variáveis de ambiente
- Criar `.env.local` com:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```
- Criar `.env.local.example` com a mesma estrutura (sem valores sensíveis)

### 11. Middleware de autenticação
- No `src/middleware.ts` adicionar protecção das rotas `(protected)` — redirecionar para `/login` se não houver token válido.

## Paradigma Mobile-First
- Todos os componentes usam classes Tailwind com breakpoints mobile-first: base → sm → md → lg → xl

## Critérios de Aceite

### CA-01: Projecto inicializado com sucesso
- **Dado que** o developer executa `npm install` e `npm run dev`
- **Quando** acede a `http://localhost:3000`
- **Então** a aplicação carrega sem erros

### CA-02: Mudança de tema funcional
- **Dado que** o utilizador acede à aplicação
- **Quando** selecciona tema escuro/claro
- **Então** o tema muda em toda a aplicação sem recarregar

### CA-03: i18n funcional
- **Dado que** o utilizador acede a `/pt-BR/...` ou `/en-US/...`
- **Quando** a página carrega
- **Então** todos os textos são exibidos no idioma correcto

### CA-04: Build sem erros
- **Dado que** o developer executa `npm run build`
- **Quando** o build termina
- **Então** não existem erros de compilação TypeScript ou ESLint

## Observações
- Não criar páginas de conteúdo nesta task — apenas a infraestrutura
- O arquivo `globals.css` deve incluir as variáveis CSS do shadcn para os dois temas
- O `layout.tsx` raiz deve incluir `ThemeProvider`, `QueryProvider` e `NextIntlClientProvider`
