# Copilot Instructions — EBL.FIG.Process.Identity.Web

## Idioma e Diretrizes Gerais
- Responder sempre em **português**.
- Não criar documentação a menos que seja explicitamente solicitado.
- Stack: **React 19, Next.js 16 (App Router, proxy.ts), TypeScript 5, Tailwind CSS v4, shadcn/ui**.

## Regra de Stack — Sem Deprecated, Sem Experimental

- **Nunca** usar APIs, ficheiros ou bibliotecas marcados como deprecated.
- **Nunca** usar versões `alpha`, `beta`, `rc`, `canary`, `experimental` em produção.
- Sempre usar a versão LTS/estável em uso no projeto.
- **Next.js 16:** o ficheiro de proxy é `src/proxy.ts` (não `middleware.ts`).
- **Tailwind v4:** configuração via `@theme inline` em `globals.css` (não `tailwind.config.ts`).
- **Corrigir imediatamente** qualquer deprecation warning no build antes de avançar.

## Comandos de Build e Testes

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar todos os testes
npm test

# Executar um único teste (por nome de ficheiro)
npx jest --testPathPattern="NomeDoComponente"

# Executar testes e2e
npx playwright test

# Lint
npm run lint
```

## Arquitetura

Projeto SPA com Next.js App Router. Estrutura feature-based:

| Pasta | Responsabilidade |
|-------|-----------------|
| `src/app/` | Rotas e páginas (Next.js App Router) |
| `src/components/ui/` | Componentes base reutilizáveis (buttons, inputs, modals) |
| `src/components/features/` | Componentes específicos de cada feature |
| `src/hooks/` | Custom hooks (`use*.ts`) — lógica de React Query e estado local |
| `src/services/` | Chamadas à API (Axios + tipos de request/response) |
| `src/stores/` | Estado global por domínio (Zustand) |
| `src/lib/schemas/` | Schemas de validação Zod |
| `src/types/` | Tipos e interfaces TypeScript globais |
| `messages/` | Ficheiros i18n (pt-BR.json, en-US.json) |

**Fluxo de dados:**  
`Page → Component → Hook (useQuery/useMutation) → Service → API`

## Padrões Principais

### Componentes
- Functional components com hooks; `'use client'` apenas quando necessário (interatividade).
- Server Components por padrão em `src/app/`.
- Props tipadas com `interface`, não `type` para objetos de props.

### Formulários
- React Hook Form + Zod. Schema em ficheiro separado: `src/lib/schemas/[recurso].schema.ts`.
- Nunca colocar mensagens de validação hardcoded — usar i18n.

### Chamadas de API
- React Query (`useQuery`, `useMutation`) encapsulado em hooks em `src/hooks/`.
- Serviços em `src/services/[recurso].service.ts` — apenas a lógica HTTP.
- Sempre tratar estado `isLoading`, `isError` e `data` nos componentes.

### i18n
- **Nunca** usar strings hardcoded visíveis ao utilizador no JSX.
- Chaves em `messages/pt-BR.json` e `messages/en-US.json`.
- Padrão: `feature.componente.campo` ou `feature.mensagem`.

### Estado Global
- Zustand em `src/stores/` — uma store por domínio de feature.
- Preferir estado local ou React Query antes de recorrer ao Zustand.

## Sistema de Agentes de IA

O projeto usa agentes Copilot para desenvolvimento automatizado.

| Agente | Ficheiro | Modelo | Papel |
|--------|----------|--------|-------|
| `Orquestrador` | `.github/agents/orquestrador.agent.md` | `claude-sonnet-4.6` | Coordena o fluxo, nunca cria código |
| `PO` | `.github/agents/po.agent.md` | `claude-sonnet-4.6` | Cria histórias BDD em `.github/workflows/stories/` |
| `Dev-J` | `.github/agents/developer-junior.agent.md` | `claude-haiku-4.5` | Baixa complexidade |
| `Dev-P` | `.github/agents/developer-pleno.agent.md` | `claude-sonnet-4.6` | Média complexidade |
| `Dev-S` | `.github/agents/developer-senior.agent.md` | `claude-opus-4.8` | Alta complexidade / arquitetura |
| `QA` | `.github/agents/qa.agent.md` | `claude-sonnet-4.6` | Valida cenários BDD, aprova/reprova |

### Fluxo
```
PO → Orquestrador → Dev-J | Dev-P | Dev-S → QA → Utilizador (review PR)
```

### Artefactos
| Tipo | Pasta |
|------|-------|
| Histórias BDD | `.github/workflows/stories/TIPO-NNN.md` |
| Relatórios de QA | `.github/workflows/qa-reports/TIPO-NNN-qa-report.md` |

### Convenções Partilhadas
`.github/agents/kanban-flow.md` — fluxo, complexidade, roteamento e stack. Todos os agentes leem este ficheiro primeiro.
