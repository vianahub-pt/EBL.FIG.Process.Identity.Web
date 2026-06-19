---
id: TASK-001
title: "Corrigir geração de ficheiros de log diários no formato yyyymmdd-identity-web.log"
type: task
priority: Alta
severity: N/A
complexity: Baixa
status: For Deploy
developer: dev-p
branch: feature/TASK-001-fix-daily-log
pr: "pending-remote-push"
created_at: 2026-06-18
updated_at: 2026-06-18
---

# TASK-001: Corrigir geração de ficheiros de log diários no formato yyyymmdd-identity-web.log

## Descrição
Como equipa de operações, quero que a aplicação gere ficheiros de log diários com o nome `yyyymmdd-identity-web.log`, para que seja possível rastrear eventos server-side de forma consistente com o padrão da API.

## Classificação
- **Tipo:** task
- **Prioridade:** Alta
- **Severidade:** N/A
- **Complexidade sugerida pelo PO:** Baixa
- **Developer provável:** dev-j
- **Motivo da complexidade:** Alterações cirúrgicas e bem delimitadas — corrigir padrão de nome de ficheiro em `logger.ts`, importar o logger nas camadas server-side já identificadas (`proxy.ts` e `services/*.service.ts`). Sem nova lógica de negócio. Diagnóstico completo já feito.

## Contexto
O projeto possui `src/lib/logger.ts` com `winston` + `DailyRotateFile` configurado, mas com dois problemas identificados:

1. **Padrão de nome incorreto:** usa `%DATE%-identity.log` em vez do padrão definido `yyyymmdd-identity-web.log`. O `datePattern` já é `YYYYMMDD`, portanto o `filename` deve ser `%DATE%-identity-web.log`.
2. **Logger nunca importado:** `logger.ts` não é importado em nenhum ficheiro da aplicação — é a causa raiz da ausência total de ficheiros de log na pasta `logs/`.

A pasta `logs/` existe com apenas `.gitkeep`.

**Restrição crítica — Next.js App Router:** `winston` é uma biblioteca Node.js e só pode ser usada em contexto server-side (`proxy.ts`, Server Components, Route Handlers). Nunca deve ser importada em Client Components (`'use client'`).

**Formato de log de referência (padrão da API):**
```
[2026-06-17 08:00:01] [INFO ] [proxy] GET /api/users 200 45ms
[2026-06-17 08:00:02] [WARN ] [auth ] Token a expirar em 5min
[2026-06-17 08:00:03] [ERROR] [api  ] Request falhou: 500 Internal Server Error
```

O formato já está implementado em `humanFormat` dentro de `logger.ts` — apenas o nome do ficheiro e as integrações estão em falta.

## Critérios de Aceite
- [ ] O padrão de nome do ficheiro de log é `%DATE%-identity-web.log` com `datePattern: 'YYYYMMDD'`, gerando ficheiros como `20260618-identity-web.log`
- [ ] O logger é importado e utilizado em `src/proxy.ts` para registar requests (método, URL, status, duração) e erros
- [ ] O logger é importado e utilizado em `src/services/*.service.ts` para registar erros de API com contexto do serviço
- [ ] Nenhum ficheiro com `'use client'` importa `src/lib/logger`
- [ ] O nível de log é controlado pela variável de ambiente `LOG_LEVEL` (default `info`) — já está implementado
- [ ] Cada linha de log segue o formato `[YYYY-MM-DD HH:mm:ss] [LEVEL] [ctx  ] mensagem`
- [ ] A retenção de ficheiros é de 30 dias (`maxFiles: '30d'`) — já está implementado
- [ ] O build passa sem erros (`npm run build`)
- [ ] O lint passa sem erros (`npm run lint`)

---

## Cenário de Sucesso — Ficheiro de log criado com nome correto
**Dado que** a aplicação está em execução em modo server-side  
**Quando** ocorre qualquer request server-side (ex: proxy encaminhando para a API)  
**Então** existe um ficheiro `logs/20260618-identity-web.log` (data atual no formato `yyyymmdd`) com pelo menos uma linha de log

## Cenário de Sucesso — Log de request no proxy
**Dado que** o utilizador faz um request autenticado que passa pelo `src/proxy.ts`  
**Quando** o proxy encaminha o request para a API e recebe a resposta  
**Então** o ficheiro de log contém uma linha no formato `[YYYY-MM-DD HH:mm:ss] [INFO ] [proxy] MÉTODO /caminho STATUS XXXms`

## Cenário de Sucesso — Log de erro de API nos serviços
**Dado que** um serviço em `src/services/` recebe um erro da API (ex: 4xx, 5xx, timeout)  
**Quando** o erro é capturado no bloco catch  
**Então** o ficheiro de log contém uma linha `[ERROR]` com o contexto do serviço e a descrição do erro

## Cenário de Sucesso — Formato legível por humanos
**Dado que** o ficheiro de log `20260618-identity-web.log` existe na pasta `logs/`  
**Quando** é aberto num editor de texto  
**Então** cada linha segue exatamente o padrão `[YYYY-MM-DD HH:mm:ss] [LEVEL] [ctx  ] mensagem`, alinhado e legível

## Cenário de Insucesso — Logger ausente nos serviços
**Dado que** um serviço recebe erro da API  
**Quando** o logger não está importado nesse serviço  
**Então** o ficheiro de log não regista o erro — **este cenário deve deixar de existir após a tarefa**

## Cenários de Borda
- **Client Component:** se alguém tentar importar `logger` num ficheiro com `'use client'`, o build deve falhar ou o lint deve alertar (verificação manual/revisão de código)
- **LOG_LEVEL ausente:** se `LOG_LEVEL` não estiver definida no ambiente, o logger usa `info` por defeito
- **Pasta `logs/` ausente:** o `DailyRotateFile` cria a pasta automaticamente se não existir
- **Erro de rede no proxy:** mesmo que o request para a API falhe por timeout ou erro de rede, o logger deve registar o erro sem lançar exceção adicional
- **Concorrência:** múltiplos requests simultâneos devem gerar linhas de log separadas sem corrupção do ficheiro

---

## Impacto Técnico
- **Camadas afetadas:** `lib/` (correção do padrão), `proxy.ts` (integração), `services/` (integração de erros)
- **Páginas/Rotas:** nenhuma — alterações exclusivamente server-side
- **Componentes:** nenhum
- **Hooks:** nenhum
- **Serviços/API calls:** `src/services/actions.service.ts`, `src/services/apps.service.ts`, `src/services/auth.service.ts`, `src/services/dashboard.service.ts`, `src/services/roles.service.ts` — adicionar log de erro nos blocos catch existentes
- **Proxy:** `src/proxy.ts` — adicionar log de request/response/erro
- **Estado global:** não aplicável
- **Formulários:** não aplicável
- **Testes:** não obrigatório para esta tarefa (sem lógica de negócio nova), mas se existirem testes dos serviços devem continuar a passar
- **i18n:** não aplicável — logs são internos, nunca visíveis ao utilizador
- **Dependências:** `winston` e `winston-daily-rotate-file` já instalados

## Ficheiros a Modificar
| Ficheiro | Alteração |
|----------|-----------|
| `src/lib/logger.ts` | Corrigir `filename` de `%DATE%-identity.log` para `%DATE%-identity-web.log` |
| `src/proxy.ts` | Importar logger e registar requests, respostas e erros |
| `src/services/actions.service.ts` | Importar logger e registar erros nos blocos catch |
| `src/services/apps.service.ts` | Importar logger e registar erros nos blocos catch |
| `src/services/auth.service.ts` | Importar logger e registar erros nos blocos catch |
| `src/services/dashboard.service.ts` | Importar logger e registar erros nos blocos catch |
| `src/services/roles.service.ts` | Importar logger e registar erros nos blocos catch |

## Definition of Ready
- [x] Requisitos de negócio claros
- [x] Critérios de aceite objetivos e verificáveis
- [x] Cenário de sucesso definido com Dado/Quando/Então
- [x] Cenário de insucesso definido com Dado/Quando/Então
- [x] Cenários de borda identificados
- [x] Contrato de API conhecido (endpoints e payloads, se aplicável) — não aplicável
- [x] Impacto por camada identificado
- [x] Prioridade definida
- [x] Severidade definida
- [x] Complexidade sugerida definida
- [x] Sem bloqueios para o Developer iniciar
- [x] Causa raiz identificada (`filename` incorreto + logger não importado)
- [x] Ficheiros de origem identificados (7 ficheiros listados acima)
- [x] Formato de log definido com referência
- [x] Restrição server-only documentada
