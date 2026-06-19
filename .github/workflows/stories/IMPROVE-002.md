---
id: IMPROVE-002
title: "Capturar e logar erros da aplicação frontend (ErrorBoundary + erros globais JS)"
type: improvement
priority: Alta
severity: N/A
complexity: Média
status: For Deploy
developer: dev-j
branch: feature/IMPROVE-002-error-boundary-observer
updated_at: 2026-06-18
---

# IMPROVE-002: Capturar e logar erros da aplicação frontend (ErrorBoundary + erros globais JS)

## Descrição
Como operador/suporte do sistema, quero que erros de renderização React, TypeErrors, ReferenceErrors e Promises rejeitadas sem `.catch` sejam capturados e registados no ficheiro de log, para que falhas silenciosas do frontend deixem de ser invisíveis.

## Classificação
- **Tipo:** improvement
- **Prioridade:** Alta
- **Severidade:** N/A
- **Complexidade sugerida pelo PO:** Média
- **Developer provável:** dev-p
- **Motivo da complexidade:** Requer componente de classe React (`ErrorBoundary`), integração com `window.onerror`/`window.onunhandledrejection` via `useEffect`, e wiring no layout protegido. Sem dependências externas, mas envolve múltiplos ficheiros e cuidado com cleanup de listeners.

## Contexto
O sistema de log atual (`logApiError` + `POST /api/log`) cobre apenas erros de chamadas à API do backend. Erros de renderização React, TypeErrors, ReferenceErrors e Promises rejeitadas sem `.catch` não são registados — são invisíveis no ficheiro de log.

O endpoint `POST /api/log` já existe e aceita `{ level, context, message }` com os níveis `error`, `warn`, `info`. O padrão de UI de fallback já existe na aplicação.

Stack: React 19, Next.js 16 App Router — Server Components por padrão; `'use client'` obrigatório em todos os componentes que usam hooks ou APIs de browser.

## Critérios de Aceite
- [ ] `src/components/ui/error-boundary.tsx` criado como componente de classe com `componentDidCatch`
- [ ] `ErrorBoundary` envia `POST /api/log` com `{ level: 'error', context: 'ui', message: '<componentStack resumido>' }` ao capturar erro de renderização
- [ ] `ErrorBoundary` exibe UI de fallback padrão ("Ocorreu um erro" + "Tentar novamente") em vez de tela branca
- [ ] `ErrorBoundary` aceita prop `fallback` opcional para UI customizada
- [ ] Listeners `window.onerror` e `window.onunhandledrejection` registados em `src/components/layout/ErrorObserver.tsx` (novo componente `'use client'`)
- [ ] Ambos os listeners enviam `POST /api/log` fire-and-forget, mesmo padrão do `logApiError`
- [ ] Cleanup correto dos listeners no `return` do `useEffect`
- [ ] `ErrorBoundary` envolve `{children}` em `src/app/[locale]/(protected)/layout.tsx`
- [ ] `ErrorObserver` incluído no layout protegido ou no `QueryProvider`
- [ ] Erros de API (cobertos pelo `logApiError`) não são duplicados no log

---

## Cenário de Sucesso — Erro de render capturado e logado
**Dado que** um componente filho lança um erro durante o render  
**Quando** o React propaga o erro para o `ErrorBoundary`  
**Então** aparece no ficheiro de log uma entrada `[ERROR] [ui   ] <nome do componente>: <mensagem>`  
**E** o utilizador vê a UI de fallback em vez de tela branca

## Cenário de Insucesso — TypeError não tratado é logado
**Dado que** ocorre um `TypeError` não capturado no browser  
**Quando** `window.onerror` é disparado  
**Então** aparece no ficheiro de log uma entrada `[ERROR] [global] <mensagem>: <ficheiro>:<linha>`

## Cenário de Insucesso — Promise rejeitada sem .catch é logada
**Dado que** uma Promise é rejeitada sem handler  
**Quando** `window.onunhandledrejection` é disparado  
**Então** aparece no ficheiro de log uma entrada `[ERROR] [global] UnhandledRejection: <razão>`

## Cenários de Borda
- **Listeners removidos no unmount:** quando o componente `ErrorObserver` é desmontado, o cleanup do `useEffect` restaura `window.onerror` e `window.onunhandledrejection` ao estado anterior (não sobrescreve listeners de terceiros já existentes)
- **Sem duplicação:** quando ocorre um erro de API coberto pelo `logApiError`, o log contém apenas a entrada do `logApiError` — o `ErrorBoundary` não captura erros de chamadas de rede (apenas erros de render)
- **Fallback customizado:** quando `ErrorBoundary` recebe a prop `fallback`, exibe esse conteúdo em vez do fallback padrão
- **Componente recuperável:** quando o utilizador clica em "Tentar novamente" no fallback padrão, o `ErrorBoundary` limpa o estado de erro e tenta re-renderizar o filho

---

## Impacto Técnico
- **Camadas afetadas:** `components/ui/`, `components/layout/`, `app/[locale]/(protected)/`
- **Páginas/Rotas:** `src/app/[locale]/(protected)/layout.tsx` (wiring do `ErrorBoundary` e `ErrorObserver`)
- **Componentes:**
  - `src/components/ui/error-boundary.tsx` — novo (componente de classe React)
  - `src/components/layout/ErrorObserver.tsx` — novo (`'use client'`, `useEffect` com `window.onerror` e `window.onunhandledrejection`)
- **Hooks:** nenhum novo hook necessário
- **Serviços/API calls:** `POST /api/log` já existente — chamada direta via `fetch` ou `axios` fire-and-forget
- **Estado global:** não aplicável
- **Formulários:** não aplicável
- **Testes:**
  - `src/components/ui/__tests__/error-boundary.test.tsx` — cenários: captura de erro, exibe fallback, prop fallback customizado, botão "Tentar novamente"
  - `src/components/layout/__tests__/error-observer.test.tsx` — cenários: registo de listeners, cleanup no unmount, chamada ao log em `window.onerror` e `window.onunhandledrejection`
- **i18n:** chaves a adicionar em `messages/pt-BR.json` e `messages/en-US.json`:
  - `errors.boundary.title` — "Ocorreu um erro inesperado"
  - `errors.boundary.retry` — "Tentar novamente"
  - `errors.boundary.description` — "Por favor, tente novamente. Se o problema persistir, contacte o suporte."
- **Dependências:** nenhuma dependência externa nova

## Definition of Ready
- [x] Requisitos de negócio claros
- [x] Critérios de aceite objetivos e verificáveis
- [x] Cenário de sucesso definido com Dado/Quando/Então
- [x] Cenário de insucesso definido com Dado/Quando/Então
- [x] Cenários de borda identificados
- [x] Contrato de API conhecido — `POST /api/log` aceita `{ level: 'error', context: string, message: string }`
- [x] Impacto por camada identificado
- [x] Prioridade definida
- [x] Severidade definida (N/A — melhoria, não bug)
- [x] Complexidade sugerida definida
- [x] Sem bloqueios para o Developer iniciar
