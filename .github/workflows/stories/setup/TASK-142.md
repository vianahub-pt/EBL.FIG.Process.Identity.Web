---
id: TASK-142
title: "Regra de stack: proibir bibliotecas deprecated, experimental ou fora de LTS"
type: TASK
status: Done
resource: setup
priority: High
created_at: 2026-06-16
author: po
developer: dev-s
branch: "main"
pr: ""
---

# TASK-142 — Regra de stack: proibir bibliotecas deprecated, experimental ou fora de LTS

## Objetivo
Garantir que todos os agentes de IA e developers do projeto usem **exclusivamente** versões estáveis LTS das bibliotecas, nunca versões deprecated ou experimental.

## Regras Obrigatórias para Todos os Agentes

### 1. Versões de dependências
- Usar **sempre** a versão LTS/estável mais recente
- **Nunca** instalar pacotes com flag `--legacy-peer-deps` sem justificativa documentada
- **Nunca** usar versões `alpha`, `beta`, `rc`, `canary`, `next`, `experimental` em produção
- Verificar deprecation warnings no output do `npm install` antes de avançar
- Se um pacote estiver deprecated, substituir pelo recomendado **antes** de implementar

### 2. APIs de framework
- **Nunca** usar APIs marcadas como deprecated na documentação oficial
- Quando um warning de deprecation aparecer no build ou runtime, **corrigir imediatamente** antes de avançar
- Consultar sempre o changelog/migration guide da versão instalada

### 3. Next.js especificamente
- Stack actual: **Next.js 16** (versão em uso no projeto)
- Em Next.js 16: usar `src/proxy.ts` em vez de `src/middleware.ts` (deprecated)
- Verificar sempre a [documentação oficial do Next.js](https://nextjs.org/docs) para a versão instalada
- O `tailwind.config.ts` é ignorado no Tailwind v4 — configuração via `@theme inline` em `globals.css`

### 4. Tailwind CSS especificamente
- Stack actual: **Tailwind CSS v4**
- Directiva: `@import "tailwindcss"` (não `@tailwind base/components/utilities`)
- Plugins: `@plugin "tailwindcss-animate"` (não `plugins: [require(...)]` no config)
- Custom variants: `@custom-variant dark (...)` (não `darkMode: ["class"]` no config)

### 5. next-intl especificamente
- Stack actual: **next-intl v4**
- Import de middleware/proxy: `import createMiddleware from 'next-intl/middleware'` (API estável)
- Configuração de routing: `src/i18n/routing.ts` com `defineRouting`
- Configuração de request: `src/i18n/request.ts` com `getRequestConfig`

## Verificação Obrigatória Antes de Qualquer Instalação

```powershell
# Antes de instalar um novo pacote, verificar:
npm info [pacote] deprecated
npm info [pacote] version
npm view [pacote] versions --json | ConvertFrom-Json | Select-Object -Last 5
```

## Stack Actual do Projeto (Junho 2026)

| Tecnologia | Versão | Notas |
|-----------|--------|-------|
| Next.js | 16.x | Proxy convention (src/proxy.ts) |
| React | 19.x | Stable |
| TypeScript | 5.x | LTS |
| Tailwind CSS | v4 | @import "tailwindcss" |
| shadcn/ui | latest | Componentes gerados |
| next-intl | v4 | createMiddleware de next-intl/middleware |
| next-themes | ^0.4 | Stable |
| TanStack Query | v5 | Stable |
| Zustand | v5 | Stable |
| Axios | v1 | Stable |
| React Hook Form | v7 | Stable |
| Zod | v3 | Stable |
| Recharts | v2 | Stable |
