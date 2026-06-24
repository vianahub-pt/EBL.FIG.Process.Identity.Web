---
story_id: TASK-002
status: APROVADO
date: 2026-06-19
developer: dev-j
pr: https://github.com/vianahub-pt/EBL.FIG.Process.Identity.Web/pull/new/fix/TASK-002-npm-audit-vulnerabilities
attempt: 1
---

# Relatório de QA — TASK-002

## Resumo
- **Status:** APROVADO
- **Data:** 2026-06-19
- **Developer:** dev-j
- **PR:** [fix/TASK-002-npm-audit-vulnerabilities](https://github.com/vianahub-pt/EBL.FIG.Process.Identity.Web/pull/new/fix/TASK-002-npm-audit-vulnerabilities)
- **Tentativa:** 1

## Cenários BDD Validados

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Vulnerabilidade eliminada via overrides | Sucesso | ✅ Aprovado | `npm audit` reporta 0 vulnerabilidades da cadeia `js-yaml / @istanbuljs/load-nyc-config`. Restam 2 moderate em `postcss/next` — fora do escopo (ver Risco Residual) |
| Build de produção não afetado | Sucesso | ✅ Aprovado | `npm run build` conclui sem erros. TypeScript OK. Output `.next/` gerado corretamente em 43s |
| Testes continuam a passar | Sucesso | ✅ Aprovado | 59 testes, 9 suites — todos passam. Sem falhas, sem regressões |
| `npm audit fix --force` não utilizado | Insucesso | ✅ Aprovado | Implementação usou `overrides` em `package.json`, não `--force`. Cenário de insucesso não se concretizou |
| Versão do jest sem upgrade necessário | Borda | ✅ Aprovado | `jest@29.7.0` mantido. Solução via `overrides` foi suficiente sem necessidade de upgrade de jest |
| Conflito de overrides | Borda | ✅ Aprovado | Nenhum conflito detectado. `js-yaml@^4.1.0` compatível com toda a árvore de dependências |
| Lock file atualizado | Borda | ✅ Aprovado | `package-lock.json` regenerado e commitado com `package.json` |
| Apenas devDependencies afetadas | Borda | ✅ Aprovado | Nenhuma dependência de produção alterada |

## Validações Técnicas

| Comando | Status | Observação |
|---------|--------|------------|
| `npm run build` | ✅ Passou | Compilado com sucesso em 40s. TypeScript finalizado em 43s. Sem erros, sem warnings de deprecation |
| `npm test` | ✅ Passou | 59 testes passados, 9 suites, 0 falhas. Tempo: 52.883s. `console.warn` sobre JSX transform é pré-existente e não relacionado com esta TASK |
| `npm run lint` | ✅ Passou | 0 erros. 1 warning pré-existente (`Unused eslint-disable directive` em `src/core/logger/logger.ts`) — não relacionado com esta TASK |
| `npm audit` | ✅ Passou (escopo) | 0 vulnerabilidades da cadeia `js-yaml`. 2 moderate residuais em `postcss/next` confirmadas como fora do escopo |

## Verificações de Código

| Item | Status | Observação |
|------|--------|------------|
| Sem strings hardcoded visíveis ao utilizador | ✅ | Alteração restrita a `package.json` e `package-lock.json` — sem código-fonte ou JSX alterado |
| Estados de loading tratados | N/A | Sem alterações em componentes |
| Estados de error tratados | N/A | Sem alterações em componentes |
| TypeScript sem erros | ✅ | `npm run build` compilou TypeScript sem erros |
| Validação Zod nos formulários | N/A | Sem alterações em formulários |
| Sem dados sensíveis expostos | ✅ | `package.json` e `package-lock.json` não contêm dados sensíveis |
| Alterações restritas a `package.json` e `package-lock.json` | ✅ | `git diff develop..HEAD --name-only` retornou apenas `package.json`, `package-lock.json` e `.github/workflows/stories/TASK-002.md` (ficheiro de história — esperado) |
| Nenhuma dependência de produção alterada | ✅ | `overrides` afeta apenas resolução de dependências transitivas de `devDependencies` |

## Risco Residual Documentado

### postcss via next — 2 vulnerabilidades moderate (fora do escopo)

- **CVE:** GHSA-qx2v-qp2m-jg93
- **Pacote:** `postcss < 8.5.10` via `next@9.3.4-canary.0 – 16.3.0-canary.5`
- **Fix disponível:** `npm audit fix --force` instalaria `next@9.3.3` — **breaking change inaceitável** (downgrade de major version)
- **Impacto real:** Vulnerabilidade de XSS no stringify CSS. No contexto desta aplicação, o risco é mitigado porque o PostCSS é usado apenas no build pipeline (processamento de CSS em build time), não em runtime no servidor ou no cliente.
- **Decisão:** Aceite como risco residual conhecido. Resolução requer upgrade de `next` para versão pós `16.3.0-canary.5` com `postcss >= 8.5.10`, fora do escopo desta TASK.
- **Cadeia:** `next → postcss` — **distinta da cadeia original** `js-yaml → @istanbuljs/load-nyc-config → babel-plugin-istanbul → @jest/transform`. Confirmado: não é da cadeia `js-yaml`.

## Bugs Encontrados

Nenhum bug encontrado.

## Decisão Final

**APROVADO** — card movido para `For Deploy`. PR pronto para revisão humana.

Todos os critérios de aceite da história TASK-002 foram cumpridos:
- ✅ `npm audit` não reporta vulnerabilidades de `js-yaml` / `@istanbuljs/load-nyc-config`
- ✅ Número total de vulnerabilidades moderate da cadeia js-yaml: **0**
- ✅ `npm run build` completa sem erros (TypeScript OK)
- ✅ `npm test` completa com 59 testes passados (sem regressões)
- ✅ Alteração restrita a `package.json` e `package-lock.json`
- ✅ Nenhuma dependência de produção alterada
- ✅ `package-lock.json` atualizado e commitado com `package.json`
