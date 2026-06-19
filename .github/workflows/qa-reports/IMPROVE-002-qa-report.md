---
story_id: IMPROVE-002
status: APROVADO
date: 2026-06-18
developer: dev-j
pr: ""
attempt: 2
---

# Relatório de QA — IMPROVE-002

## Resumo
- **Status:** APROVADO
- **Data:** 2026-06-18
- **Developer:** dev-j (correção Bug 1 — tentativa 2)
- **PR:** —
- **Tentativa:** 2

## Cenários BDD Validados

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Erro de render capturado → fallback visível + POST /api/log com context: 'ui' | Sucesso | ✅ Aprovado | `componentDidCatch` envia fetch com `level:'error', context:'ui'`; fallback renderizado com `role="alert"` |
| TypeError global → POST /api/log com context: 'global' | Insucesso | ✅ Aprovado | `window.onerror` captura e envia mensagem no formato `<msg>: <source>:<line>` |
| Promise rejeitada → POST /api/log com context: 'global', message 'UnhandledRejection: ...' | Insucesso | ✅ Aprovado | `window.onunhandledrejection` envia `UnhandledRejection: <reason>` |
| Cleanup de listeners no unmount | Borda | ✅ Aprovado | `useEffect` restaura handlers anteriores (`previousOnError`, `previousOnUnhandledRejection`) |
| Sem duplicação com erros de API (logApiError) | Borda | ✅ Aprovado | `ErrorBoundary` captura apenas erros de render React; erros de rede não chegam ao `componentDidCatch` |
| Fallback customizado via prop `fallback` | Borda | ✅ Aprovado | Prop `fallback?: ReactNode` implementada e testada |
| Botão "Tentar novamente" reseta estado de erro | Borda | ✅ Aprovado | `handleRetry` faz `setState({ hasError: false })` |

## Validações Técnicas

| Comando | Status | Observação |
|---------|--------|------------|
| `npm run build` | ✅ Passou | Compiled successfully; TypeScript sem erros (tentativa 2) |
| `npm test` | ✅ Passou | 51 testes, 7 suites — sem falhas (tentativa 2) |
| `npm run lint` | ✅ Passou | Sem erros ou warnings |

## Verificações de Código

| Item | Status | Observação |
|------|--------|------------|
| Sem strings hardcoded visíveis ao utilizador | ✅ | Wrapper `ErrorBoundary` injeta traduções via `useTranslations('errors.boundary')`; `ErrorBoundaryBase` usa apenas props |
| Estados de loading tratados | N/A | Não aplicável a este componente |
| Estados de error tratados | ✅ | Fallback exibido corretamente; `role="alert"` presente |
| TypeScript sem erros | ✅ | Build TypeScript sem erros |
| Validação Zod nos formulários | N/A | Não aplicável |
| Sem dados sensíveis expostos | ✅ | Apenas `error.message` e `componentStack` são logados |
| Wiring em `(protected)/layout.tsx` | ✅ | `<ErrorBoundary>` envolve children; `<ErrorObserver />` incluído |
| Chaves i18n adicionadas nos ficheiros JSON | ✅ | `errors.boundary.{title,retry,description}` presentes em `pt-BR.json` e `en-US.json` |

## Bug 1 — Strings hardcoded (RESOLVIDO na tentativa 2)
- **Resolução:** Componente de classe `ErrorBoundaryBase` separado do wrapper `ErrorBoundary`. O wrapper usa `useTranslations('errors.boundary')` e injeta `title`, `description`, `retryLabel` via props. Zero strings hardcoded no JSX.
- **Testes:** 5 testes do `error-boundary.test.tsx` validam o mock de i18n — todos passam.

## Decisão Final

**APROVADO** — card movido para `For Deploy`. PR pronto para revisão humana.
