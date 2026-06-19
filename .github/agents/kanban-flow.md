# Shared Flow — Identity Web (React + Next.js)

Este documento define o fluxo de trabalho partilhado entre os agentes de IA do projeto **EBL.FIG.Process.Identity.Web** (frontend React + Next.js).

Toda a comunicação com o utilizador será sempre em **português**.

---

# Regras de Ouro (Obrigatórias)

1. **Handoff objetivo e minimalista:** o agente remetente deve enviar ao próximo agente apenas o necessário para executar a etapa atual (ID da história, ficheiro, status, ação esperada e critérios/cenários diretamente acionáveis). É proibido handoff sobrecarregado com contexto redundante ou reexecução de validações já concluídas por agente anterior.
2. **Fluxo contínuo sem intervenção humana operacional:** nenhuma etapa operacional pode solicitar confirmação do utilizador. A única intervenção humana permitida é revisar PR, aprovar PR e fazer merge.

---

## Armazenamento de Artefactos

| Artefacto | Pasta | Formato |
|-----------|-------|---------|
| Histórias de utilizador, bugs, fixes, tarefas | `.github/workflows/stories/` | `TIPO-NNN.md` |
| Relatórios de QA e evidências de testes | `.github/workflows/qa-reports/` | `TIPO-NNN-qa-report.md` |

**IDs de história** gerados pelo PO: `STORY-NNN`, `BUG-NNN`, `FIX-NNN`, `TASK-NNN`, `SPIKE-NNN`, `REFACTOR-NNN`, `IMPROVE-NNN`  
(ex: `STORY-001`, `BUG-003`)

O número sequencial deve ser determinado lendo os ficheiros existentes em `.github/workflows/stories/`.

## Status de Rastreio

O estado de cada história é controlado pelo campo `status:` no frontmatter YAML do ficheiro em `.github/workflows/stories/`.

| Status | Quem define | Significado |
|--------|-------------|-------------|
| `Backlog` | `po` | Criada, aguarda refinamento completo |
| `To do` | `po` | Pronta para desenvolvimento |
| `In Progress` | Developer | Developer atribuído e a implementar |
| `For Tests` | Developer | Implementação concluída, aguarda QA |
| `In Test` | `qa` | QA a validar |
| `For Deploy` | `qa` | Aprovada, aguarda revisão de PR |
| `Done` | utilizador | PR mergeado e concluído |

---

# Regra de Automação Contínua

O fluxo deve ser **contínuo e fluido**, sem intervenção humana nas etapas operacionais dos agentes.

A intervenção humana ocorre **apenas** nos seguintes momentos:
1. Validar o resultado final quando o QA aprovar.
2. Revisar o PR.
3. Aprovar o PR.
4. Fazer o merge do PR para a branch de destino.

Os agentes **não devem pedir confirmação** para:
- criar ou refinar história em `.github/workflows/stories/`
- atualizar o `status:` no ficheiro da história
- criar branch
- implementar
- executar build e testes
- commitar alterações
- fazer push da branch
- criar PR
- invocar o próximo agente
- criar relatório de QA em `.github/workflows/qa-reports/`
- reprovar e encaminhar correção

Também é proibido pedir confirmação ao utilizador para:
- coexistência de alterações locais não relacionadas, desde que não sejam revertidas
- continuidade do fluxo entre PO, Developer e QA
- decisões operacionais cobertas pelas regras deste ficheiro

O fluxo **só deve parar** quando existir bloqueio real:
- requisito de negócio ausente
- critério de aceite ambíguo
- dependência externa não resolvida
- erro técnico impeditivo que o agente não consiga resolver
- risco de segurança ou perda de dados que exija decisão humana

---

# Regra Fundamental do Fluxo

## O Orquestrador NUNCA desenvolve

O `orquestrador` é **exclusivamente um coordenador de fluxo**. Ele **NUNCA** deve criar branch, implementar código, executar build/testes, commitar, fazer push, criar PR, atualizar o status da história para `In Progress`, `For Tests` ou `In Test`.

## A Única Intervenção Humana

A **única** intervenção humana possível em todo o ciclo de vida de uma história é:
1. **Revisar** o PR final.
2. **Aprovar** o PR final.
3. **Fazer o merge** do PR final para a branch de destino.

## Proteção da Estrutura de Agentes — NUNCA Alterar

Nenhuma alteração no repositório pode modificar, remover, renomear ou desativar os ficheiros de agentes em `.github/agents/` sem solicitação explícita do utilizador.

---

# Fluxo Oficial

```text
PO → Orquestrador → Dev-J | Dev-P | Dev-S → QA → Utilizador (review PR)
```

Progressão de status:
```text
Backlog → To do → In Progress → For Tests → In Test → For Deploy → Done
```

---

# Responsabilidades por Etapa

| Etapa | Status | Responsável | Ação |
|-------|--------|-------------|------|
| Refinamento | Backlog | `po` | Criar ficheiro em `.github/workflows/stories/` com todos os detalhes BDD |
| Pronto para dev | To do | `po` | Atualizar `status: To do` no ficheiro da história |
| Classificação | To do | `orquestrador` | Ler história, classificar complexidade, escolher Developer e fazer handoff |
| Desenvolvimento | In Progress | Developer escolhido | Atualizar `status: In Progress`, criar branch, implementar, PR |
| Pronto para QA | For Tests | Developer | Atualizar `status: For Tests` e campos `branch:`/`pr:`, invocar QA |
| Validação | In Test | `qa` | Atualizar `status: In Test`, validar cenários BDD, criar relatório |
| Aprovado | For Deploy | `qa` | Atualizar `status: For Deploy` |
| Concluído | Done | utilizador | Atualizar `status: Done` após merge |

---

# Critério de Roteamento por Complexidade

## Baixa Complexidade → `dev-j`

Tarefa simples, escopo localizado, baixo risco, sem novo componente de layout, sem nova rota, sem lógica de estado complexa.

**Exemplos:**
- Ajustes de texto, labels ou traduções (i18n)
- Correções em validações de formulário existentes
- Pequenos ajustes de estilo (CSS/Tailwind)
- Correções em componentes UI isolados existentes
- Ajustes em testes unitários existentes

**Não usar** se envolver: novo componente de feature, nova página/rota, autenticação, estado global, integração com API, decisão de arquitetura.

## Média Complexidade → `dev-p`

Tarefa funcional intermediária seguindo padrões existentes.

**Exemplos:**
- Novo componente de feature reutilizável
- Nova página/rota seguindo padrão existente
- Novo formulário com validação
- Integração com endpoint da API
- Hook personalizado
- Testes unitários para novos componentes

**Não usar** se envolver: autenticação/autorização, estado global complexo, nova arquitetura de módulo, performance crítica, bug crítico, refatoração estrutural.

## Alta Complexidade → `dev-s`

Tarefa de alto risco, impacto arquitetural ou decisão técnica relevante.

**Exemplos:**
- Features transversais ou de múltiplas camadas
- Refatorações estruturais de componentes ou módulos
- Bugs críticos ou de alto impacto
- Arquitetura de estado global (Zustand/Redux)
- Autenticação JWT / fluxo de login/refresh
- Performance (lazy loading, code splitting, caching)
- Segurança (XSS, CSRF, sanitização de inputs)
- Integração de nova biblioteca ou framework
- Definição de novos padrões técnicos

**Regra de decisão:** Em caso de dúvida: `Junior vs Pleno → Pleno`, `Pleno vs Senior → Senior`

---

# Reprovação pelo QA

Se o QA reprovar:
1. QA cria/atualiza relatório em `.github/workflows/qa-reports/{ID}-qa-report.md`.
2. QA atualiza `status: In Progress` no ficheiro da história.
3. QA indica o Developer adequado para a correção.
4. QA envia handoff de reprovação para o `orquestrador`.
5. `orquestrador` encaminha a correção ao Developer recomendado.

| Tipo de problema | Developer recomendado |
|-----------------|----------------------|
| Texto/estilo/validação simples | `dev-j` |
| Lógica de componente, formulário, hook, integração API | `dev-p` |
| Arquitetura, autenticação, estado global, performance, segurança | `dev-s` |

## Regra Anti-loop

Se o mesmo bug for reportado 2 vezes na mesma história:
1. Não insistir em correção automática.
2. Escalar para o utilizador e `orquestrador`.
3. Apresentar histórico das tentativas registadas no relatório de QA.

---

# Stack e Convenções do Projeto

- **Stack:** React 18+, Next.js 14+ (App Router), TypeScript, Tailwind CSS, React Hook Form, Zod, React Query (TanStack Query), Zustand
- **Arquitetura:** Feature-based com separação clara entre `ui/`, `features/`, `services/`, `hooks/`, `stores/`, `lib/`, `types/`
- **Roteamento:** Next.js App Router (`src/app/`)
- **Chamadas de API:** React Query + Axios/fetch em `src/services/`
- **Estado global:** Zustand em `src/stores/`
- **Formulários:** React Hook Form + Zod
- **Testes:** Jest + React Testing Library + Playwright (e2e)
- **i18n:** next-intl com ficheiros em `messages/` (pt-BR, en-US)
- **Build:** `npm run build`
- **Dev:** `npm run dev`
- **Testes unitários:** `npm test`
- **Teste único:** `npx jest --testPathPattern="NomeDoComponente"`
- **Lint:** `npm run lint`
- **E2e:** `npx playwright test`

---

# Comandos Git e PR

```powershell
# Identificar repositório atual
git remote get-url origin

# Criar branch
git checkout develop
git pull origin develop
git checkout -b feature/TIPO-NNN-slug   # ou fix/ para bugs

# Após implementar
npm run build
npm test
git add .
git commit -m "feat(scope): describe - refs TIPO-NNN"
git push origin feature/TIPO-NNN-slug

# Criar PR
gh pr create --base develop --title "feat: título" --body "Refs TIPO-NNN"
```

---

# Regra de Stack — Bibliotecas e Versões

## OBRIGATÓRIO para todos os agentes

1. **Usar exclusivamente versões LTS/estáveis** das dependências — nunca `alpha`, `beta`, `rc`, `canary`, `next` ou `experimental`
2. **Corrigir deprecation warnings imediatamente** — qualquer warning no build ou runtime deve ser resolvido antes de avançar para o próximo passo
3. **Verificar a documentação da versão instalada** — não assumir que APIs de versões anteriores funcionam
4. **Nunca usar `--legacy-peer-deps`** sem documentar o motivo na história

## Stack Estável do Projeto (referência)

| Tecnologia | Versão | Convenção actualizada |
|-----------|--------|-----------------------|
| Next.js | 16.x | `src/proxy.ts` (não `middleware.ts`) |
| Tailwind CSS | v4 | `@import "tailwindcss"` em globals.css |
| next-intl | v4 | `createMiddleware` de `next-intl/middleware` |
| React | 19.x | Server Components por padrão |

## Se encontrar um warning de deprecation
1. Parar a implementação
2. Identificar a API/ficheiro deprecated
3. Consultar a documentação oficial da versão instalada
4. Migrar para a API actual
5. Verificar que o build passa sem warnings
6. Documentar a migração na história
