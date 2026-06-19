---
story_id: BUG-001
status: APROVADO
date: 2026-06-18
developer: dev-p
pr: "n/a — repositório sem remote configurado"
attempt: 1
---

# Relatório de QA — BUG-001

## Resumo
- **Status:** APROVADO
- **Data:** 2026-06-18
- **Developer:** dev-p
- **PR:** n/a — repositório sem remote configurado
- **Tentativa:** 1

## Cenários BDD Validados

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Erro de API do dashboard é registado | Sucesso | ✅ Aprovado | `service-log.ts` usa `fetch('/api/log', ...)` no browser; route handler escreve via `createContextLogger('dashboard')` |
| Erro de qualquer serviço client-side é registado | Sucesso | ✅ Aprovado | Todos os 5 serviços (`actions`, `apps`, `auth`, `dashboard`, `roles`) chamam `logApiError` nos catch blocks |
| Route Handler rejeita payload inválido (400) | Insucesso | ✅ Aprovado | `isValidPayload` valida lista branca exata de 3 campos, enum `level`, strings não-vazias |
| Validação: campos em falta retornam 400 | Borda | ✅ Aprovado | Coberto em testes: level inválido, campo ausente, campo extra, string vazia |
| Host externo rejeitado com 403 | Borda | ✅ Aprovado | Comparação `host !== expectedHost` → 403 |
| Falha do fetch não quebra a aplicação | Borda | ✅ Aprovado | `.catch(() => {})` silencioso no client-side |
| Server-side inalterado (proxy.ts via createContextLogger direto) | Borda | ✅ Aprovado | `proxy.ts` importa e usa `createContextLogger` diretamente sem passar pelo Route Handler |

## Validações Técnicas

| Comando | Status | Observação |
|---------|--------|------------|
| `npm run build` | ✅ Passou | Compilação Turbopack OK; TypeScript OK; rota `/api/log` aparece no output |
| `npm test` | ✅ Passou | 38/38 testes; 5 suites; inclui `route.test.ts` com 10 casos |
| `npm run lint` | ✅ Passou | Sem erros ou avisos de lint |

## Verificações de Código

| Item | Status | Observação |
|------|--------|------------|
| Sem strings hardcoded visíveis ao utilizador | ✅ | Nenhum dos ficheiros alterados contém strings visíveis ao utilizador |
| Estados de loading tratados | N/A | Ficheiros de infra (route handler + service util) |
| Estados de error tratados | ✅ | fire-and-forget com `.catch(() => {})` silencioso |
| TypeScript sem erros | ✅ | Build passou sem erros TS; sem `any` injustificado |
| Validação Zod nos formulários | N/A | Não aplicável a esta história |
| Sem dados sensíveis expostos | ✅ | Route handler devolve apenas status codes sem corpo (null); sem detalhe de servidor |
| Segurança — lista branca de campos | ✅ | `isValidPayload` valida exatamente 3 campos; campos extra → 400 |
| Segurança — log injection | ✅ | `String(message).trim()` trata message como string opaca sem interpolação |
| Segurança — host externo | ✅ | Header `host` comparado com `request.nextUrl.host`; mismatch → 403 |

## Bugs Encontrados

Nenhum bug encontrado.

## Decisão Final

**APROVADO** — card movido para `For Deploy`. PR pronto para revisão humana.
