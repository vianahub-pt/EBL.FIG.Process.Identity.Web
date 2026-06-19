---
story_id: BUG-152
status: APROVADO
date: 2026-06-17
developer: dev-s
pr: N/A
attempt: 1
---

# Relatório de QA — BUG-152

## Resumo
- **Status:** APROVADO
- **Data:** 2026-06-17
- **Developer:** dev-s
- **PR:** N/A
- **Tentativa:** 1

## Cenários BDD Validados

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Login público funciona com locale e sem token | Sucesso | ✅ Aprovado | Evidência de runtime: `GET /login` retornou 200 com rewrite para `/pt-BR/login`; acessos diretos a `/pt-BR/login` e `/en-US/login` canonizam para `/login` sem 404. |
| Regressão do bug com tratamento incorreto de rota pública | Insucesso | ✅ Aprovado | Não reproduzido após ajuste no `src/proxy.ts`; normalização de locale antes da checagem de rotas públicas eliminou retorno 404 no fluxo de login. |
| Proteção de rotas privadas sem token | Borda | ✅ Aprovado | Evidência de runtime: `GET /apps` sem token retornou 307 para `/login`. |
| Acesso a rota privada com cookie de autenticação contendo accessToken | Borda | ✅ Aprovado | Evidência de runtime: `GET /apps` com cookie `auth-storage` com `accessToken` retornou 200. |

## Validações Técnicas

| Comando | Status | Observação |
|---------|--------|------------|
| `npm run build` | ✅ Passou | Inicialmente falhou por artefato local em `.next/dev/types/routes.d.ts`; após limpeza de `.next`, build passou e TypeScript concluiu sem erros. |
| `npm test` | ✅ Passou | Sem testes encontrados (`--passWithNoTests`), execução concluída com código 0. |
| `npm run lint` | ✅ Passou | `eslint src/` concluído com `EXIT:0`. |

## Verificações de Código

| Item | Status | Observação |
|------|--------|------------|
| Sem strings hardcoded visíveis ao utilizador | ✅ | Alteração concentrada em lógica de proxy (`src/proxy.ts`), sem introdução de texto de UI. |
| Estados de loading tratados | ✅ | Sem alteração de componentes de UI; sem regressão observada no escopo do bug. |
| Estados de error tratados | ✅ | Sem alteração de componentes de UI; sem regressão observada no escopo do bug. |
| TypeScript sem erros | ✅ | Build final concluiu TypeScript com sucesso após limpeza de cache local. |
| Validação Zod nos formulários | N/A | Não houve alteração de formulários neste bug. |
| Sem dados sensíveis expostos | ✅ | Não foram identificadas exposições de segredos; fluxo usa cookie `auth-storage` apenas para verificação de presença de `accessToken`. |

## Bugs Encontrados

Nenhum bug bloqueante encontrado.

## Decisão Final

**APROVADO** — card movido para `For Deploy`. PR pronto para revisão humana.
