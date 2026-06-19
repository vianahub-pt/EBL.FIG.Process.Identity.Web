---
story_id: BUG-149
status: APROVADO
date: 2026-06-17
developer: dev-s
pr: N/A (execução local)
attempt: 1
---

# Relatório de QA — BUG-149

## Resumo
- **Status:** ✅ APROVADO
- **Data:** 2026-06-17
- **Developer:** dev-s (Senior)
- **PR:** N/A (validação local sem abertura de PR)
- **Tentativa:** 1

---

## Cenários BDD Validados

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Causa raiz confirmada com isolamento e evidências | Sucesso | ✅ Aprovado | Investigação documentada com hipóteses confirmadas/refutadas para cache, proxy, i18n e artefatos. Medições before/after com cache preservado vs limpo validadas. |
| 404 em `/`, `/apps` e `/login` diferenciado por estado | Borda | ✅ Aprovado | Dev-s mediu todos os paths em estado anômalo (cache preservado) e saudável (cache limpo). Comportamento consistente com esperado após mitigação. |
| 307 redirect vs 404 real diferenciado corretamente | Borda | ✅ Aprovado | Dev-s confirmou que `/login` retorna `404` apenas no estado anômalo e `200` após limpeza de cache. Proxies `/` e `/apps` mantêm `307` esperado. |
| Evento `filesystem cache database compaction` validado | Borda | ✅ Aprovado | Confirmado como comportamento esperado do Turbopack (observado em ambos: estado anômalo com `25.0s` e após recuperação com `10.4s`). Não caracteriza bug de rota. |
| Mitigação operacional funcional | Borda | ✅ Aprovado | Scripts `dev:clean` e `dev:reset` adicionados. `dev:clean` testado com sucesso (`.next` removido). `dev:reset` sintaticamente correto (concatenação de `dev:clean` + `next dev`). |

---

## Validações Técnicas

| Comando | Status | Tempo | Observação |
|---------|--------|-------|------------|
| `npm run build` | ✅ Passou | 26.2s | TypeScript OK. Todas as 7 rotas compiladas. Proxy middleware OK. |
| `npm test` | ✅ Passou | <1s | Nenhum teste quebrado. Projeto em estágio inicial (sem testes ainda). |
| `npm run lint` | ✅ Passou | <1s | ESLint OK, sem erros ou warnings. |
| `npm run dev:clean` | ✅ Passou | <1s | Script executado com sucesso. `.next` removido corretamente. |
| `npm run dev:reset` | ✅ Sintaticamente OK | N/A | Script adicionado corretamente em `package.json`. Dependências (`dev:clean` e `next dev`) validadas. |

---

## Verificações de Código

| Item | Status | Observação |
|------|--------|------------|
| Sem strings hardcoded visíveis ao utilizador | ✅ OK | Nenhuma alteração no código-fonte. Scripts adicionados apenas em `package.json`. |
| Estados de loading tratados | ✅ OK | Não aplicável — história é investigação/diagnóstico, sem alterações de componentes. |
| Estados de error tratados | ✅ OK | Não aplicável — história é investigação/diagnóstico. |
| TypeScript sem erros | ✅ OK | Build passou sem erros (26.2s). |
| Validação Zod nos formulários | ✅ N/A | Não aplicável — sem alterações em formulários. |
| Sem dados sensíveis expostos | ✅ OK | Nenhuma exposição de dados. Scripts apenas manipulam `.next` local. |
| Sem deprecation warnings | ✅ OK | Build clean, sem warnings. |
| Nenhum teste removido/desabilitado | ✅ OK | Projeto em estágio inicial. Nenhuma regressão. |

---

## Problemas Encontrados
**Nenhum bloqueante.**

---

## Resultados da Investigação (do dev-s)

### Causa Raiz Confirmada
**Turbopack filesystem cache corruptado em estado local** — O cache preservado em estado anômalo causava 404 intermitente em `/login`, refutando proxy e i18n como causa raiz.

### Evidências Coletadas
- Baseline anômalo: `/login` retorna `404` em 117-161ms
- Após `npm run dev:clean`: `.next` removido
- Primeira carga pós-limpeza: `/login` retorna `200` em 13.8s (cold start)
- Cargas subsequentes: `/login` retorna `200` em 247-1104ms
- Comportamento stável após recuperação: sem 404

### Hipóteses Confirmadas/Refutadas
| Eixo | Resultado | Evidência |
|------|-----------|-----------|
| Cache Turbopack/artefatos | ✅ **Confirmado** como causa principal | `404` desaparece após `dev:clean` |
| Proxy (`src/proxy.ts`) | ❌ **Refutado** | Tempos de proxy baixos (ordem ms), comportamento de redirect consistente |
| i18n/locale (`next-intl`) | ❌ **Refutado** | Com cache íntegro, `/login` responde `200` consistentemente |
| Evento compaction | ✅ **Comportamento esperado** | Observado em ambos estados (25.0s anômalo, 10.4s pós-limpeza) |

### Mitigação Aplicada
Adicionados dois scripts operacionais em `package.json`:
- `dev:clean`: remove `.next` de forma segura (não afeta código-fonte)
- `dev:reset`: executa limpeza + `next dev` em sequência

### Risco Residual
- **Cold start lento:** primeira compilação após limpeza completa pode levar ~13-20s (esperado em Turbopack), mas sem 404 no fluxo.
- **Reaparecimento se cache corromper novamente:** se cache voltar a estado inconsistente por fatores externos (branch switches frequentes, processos concorrentes), executar `npm run dev:reset`.

---

## Decisão Final

### ✅ APROVADO

**Motivos:**
1. Todos os cenários BDD de sucesso validados com evidências documentadas.
2. Causa raiz isolada com diferenciação clara entre cache vs rota/proxy/i18n.
3. Mitigação operacional segura e funcional adicionada.
4. Build, testes e lint sem erros ou regressões.
5. Nenhuma string hardcoded, sem exposição de dados, sem alterações críticas.
6. Investigação completa com recomendação objetiva (scripts operacionais para recuperação).

### Próximas Ações Esperadas
1. **Utilizador:** Revisar relatório QA e aceitar na PR (se houver).
2. **Orquestrador:** Mover story para `For Deploy`.
3. **DevOps (opcional):** Considerar documentação de troubleshooting em README para futuros contributors sobre uso de `npm run dev:reset` caso sintomas retornem.

---

## Observações Finais
Esta investigação forneceu análise técnica clara para debugging futuro de lentidão em dev. Os scripts operacionais (`dev:clean`, `dev:reset`) são segurança complementar contra degradação de cache local, alinhados com melhores práticas em Next.js/Turbopack.
