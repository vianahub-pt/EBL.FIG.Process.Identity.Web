---
id: IMPROVE-001
title: "Integração do Novo Endpoint /v1/dashboard para Consolidação de Métricas"
type: improvement
priority: Alta
severity: N/A
complexity: Média
status: For Deploy
developer: dev-p
branch: feature/IMPROVE-001-dashboard-endpoint
pr: "https://github.com/EBL.FIG/Process.Identity.Web/pull/001"
created_at: 2026-06-17
updated_at: 2026-06-17
qa_started_at: 2026-06-17
qa_completed_at: 2026-06-17
qa_revalidation_completed_at: 2026-06-17
fixes_completed_at: 2026-06-17
---

# IMPROVE-001: Integração do Novo Endpoint /v1/dashboard para Consolidação de Métricas

## Descrição
Como utilizador final, quero que a página de dashboard carregue com uma única requisição consolidada, para que a performance e experiência de carregamento melhorem significativamente, reduzindo latência e carga na rede.

## Classificação
- **Tipo:** improvement
- **Prioridade:** Alta
- **Severidade:** N/A
- **Complexidade sugerida pelo PO:** Média
- **Developer provável:** dev-p
- **Motivo da complexidade:** Refactorização de 10 requisições em 1, atualização de tipos TypeScript, modificação de hook e serviço. Sem mudanças visuais; risco reduzido.

## Contexto
Atualmente, a página home/dashboard faz **10 requisições HTTP separadas** para obter todas as informações necessárias:
- `GET /v1/users` (2x para count e items)
- `GET /v1/apps` (2x para count e items)
- `GET /v1/roles`
- `GET /v1/actions`
- `GET /v1/resources`
- `GET /v1/tenants`
- `GET /v1/role-permissions`
- `GET /v1/user-roles`

O backend criou um novo endpoint consolidado `GET /v1/dashboard` que devolve **todas essas informações em uma única requisição**, reduzindo:
- Latência percebida pelo utilizador
- Número de requisições HTTP
- Carga de rede
- Overhead de parsing e tratamento de respostas múltiplas

Esta melhoria será implementada sem mudanças visuais ou funcionais — apenas otimização de performance do backend.

### Contrato da API
**Endpoint:** `GET /v1/dashboard`  
**Método:** GET  
**Autenticação:** Bearer token (OAuth)  
**Rate Limit:** Padrão da aplicação  

**Resposta de sucesso (200 OK):**
```json
{
  "usersCount": 42,
  "usersStatus": [
    { "id": 1, "isActive": true },
    { "id": 2, "isActive": false },
    { "id": 3, "isActive": true }
  ],
  "rolesCount": 8,
  "actionsCount": 156,
  "resourcesCount": 73,
  "appsCount": 5,
  "appsStatus": [
    { "id": 101, "isActive": true },
    { "id": 102, "isActive": true }
  ],
  "tenantsCount": 3,
  "rolePermissionsCount": 524,
  "userRolesCount": 127
}
```

## Critérios de Aceite
- [ ] Novo tipo TypeScript `DashboardResponse` criado em `src/types/` com estrutura exata do contrato
- [ ] Serviço `dashboardService.getDashboard()` criado em `src/services/dashboard.service.ts` consumindo `/v1/dashboard`
- [ ] Hook `useDashboard()` refatorizado em `src/hooks/use-dashboard.ts` para usar nova requisição única
- [ ] Todos os 10 métodos antigos do serviço removidos (getUsersCount, getUsersWithStatus, etc.)
- [ ] Hook retorna os mesmos dados no mesmo formato anterior (compatibilidade 100% com componentes)
- [ ] Requisição única da API confirmada (sem fallback para 10 requisições antigas)
- [ ] Testes unitários para novo tipo TypeScript
- [ ] Testes para novo método de serviço
- [ ] Testes para hook refatorizado
- [ ] Lint sem erros (`npm run lint`)
- [ ] Build sem erros (`npm run build`)
- [ ] Dashboard carrega com sucesso e exibe as mesmas métricas sem regressão visual

## Cenário de Sucesso — Carregamento Consolidado da Dashboard
**Dado que** o utilizador está autenticado e navega para a página home/dashboard  
**Quando** a página é carregada pela primeira vez  
**Então** exatamente **uma única requisição HTTP** é feita para `GET /v1/dashboard`  
**E** a resposta é recebida com status 200 OK  
**E** os dados são armazenados em cache de React Query com chave `['dashboard']`  
**E** todas as métricas (users count, roles count, apps status, etc.) são exibidas na dashboard  
**E** não há nenhuma requisição para `/v1/users`, `/v1/roles`, `/v1/apps` ou outros endpoints antigos  
**E** o tempo de carregamento é visualmente mais rápido que antes

## Cenário de Insucesso — Erro na Requisição Consolidada
**Dado que** o utilizador está autenticado  
**Quando** a página home/dashboard é carregada  
**E** o servidor de backend retorna erro 500 (Internal Server Error) na requisição para `/v1/dashboard`  
**Então** o hook `useDashboard()` retorna estado `isError = true`  
**E** a dashboard exibe componente de erro genérico ou alert toast com mensagem "Falha ao carregar métricas do dashboard. Por favor, tente novamente."  
**E** o utilizador pode clicar em botão de retry para recarregar os dados  
**E** nenhuma métrica incorreta é exibida

## Cenários de Borda

### Validação — Resposta Incompleta ou Malformada
**Dado que** o servidor retorna resposta parcial (faltam alguns campos, ex: `appsStatus` é null)  
**Quando** o hook processa a resposta  
**Então** valores padrão são aplicados (arrays vazios `[]` para arrays, `0` para counts)  
**E** a dashboard exibe com dados incompletos em vez de quebrar

### Autenticação — Token Expirado
**Dado que** o token OAuth do utilizador expirou  
**Quando** a página dashboard é carregada  
**E** a requisição `/v1/dashboard` retorna erro 401 (Unauthorized)  
**Então** o middleware de autenticação redireciona para `/login`  
**E** a dashboard não carrega dados parciais

### Permissões — Sem Role Suficiente
**Dado que** o utilizador tem role insuficiente para aceder ao endpoint `/v1/dashboard`  
**Quando** a requisição é feita  
**E** o servidor retorna erro 403 (Forbidden)  
**Então** o hook captura o erro e exibe mensagem "Sem permissão para aceder aos dados do dashboard"

### Cache e Refetch
**Dado que** o utilizador abriu a página dashboard e dados foram carregados com sucesso  
**Quando** o utilizador abre uma aba nova com a mesma página  
**Então** React Query utiliza dados em cache da primeira requisição (sem fazer nova requisição)  
**Quando** o utilizador clica em botão de refresh/refetch  
**Então** uma nova requisição para `/v1/dashboard` é feita e dados são atualizados

### Concorrência — Duplo Clique ou Recarregamento Rápido
**Dado que** o utilizador recarrega a página rapidamente (ex: duplo clique na aba)  
**Quando** duas requisições `/v1/dashboard` são disparadas quase simultaneamente  
**Então** React Query deduplicates as requisições (apenas 1 é feita)  
**E** ambas as componentes que dispararam recebem o mesmo resultado

---

## Impacto Técnico

### Camadas Afetadas
- **src/types/** — novo tipo `DashboardResponse`
- **src/services/dashboard.service.ts** — novo método `getDashboard()`, remoção de 10 métodos antigos
- **src/hooks/use-dashboard.ts** — refatorização de `useQueries()` para `useQuery()` único
- **Componentes** — nenhum (compatibilidade retroativa)

### Páginas/Rotas
- `src/app/[locale]/(protected)/page.tsx` — página home/dashboard

### Componentes Afetados
- `AppsStatusChart` — consome `appsStatus` via hook
- `UsersStatusChart` — consome `usersStatus` via hook
- `MetricCard` — consome counts via hook
- `ResourcesSummaryChart` — consome `resourcesCount` via hook
- Qualquer outro componente dashboard que utilize `useDashboard()`

### Hooks
- `use-dashboard.ts` — refatorização completa

### Serviços/API Calls
- Novo endpoint consumido: `GET /v1/dashboard`
- Endpoints antigos removidos do serviço (não eliminar chamadas reais da app, apenas o serviço)

### Estado Global
- Sem impacto direto em Zustand stores

### Formulários
- Sem impacto

### Testes
- Testes unitários para tipo `DashboardResponse` (validação de estrutura)
- Testes para `dashboardService.getDashboard()` (mock da API)
- Testes para `useDashboard()` (simulação de sucesso e erro)
- Testes de integração da página dashboard (confirmação de carregamento com sucesso)

### i18n
- Verificar se existem mensagens de erro a usar em `messages/pt-BR.json` e `messages/en-US.json`
- Adicionar chave para mensagem de erro consolidada (ex: `dashboard.error.loadFailed`)

### Dependências
- Nenhuma nova dependência necessária (React Query já está no projeto)

---

## Definition of Ready
- [x] Requisitos de negócio claros — consolidar 10 requisições em 1
- [x] Critérios de aceite objetivos e verificáveis — listados acima
- [x] Cenário de sucesso definido — carregamento único com sucesso
- [x] Cenário de insucesso definido — erro 500, 401, 403
- [x] Cenários de borda identificados — resposta incompleta, cache, concorrência
- [x] Contrato de API conhecido — estrutura JSON exata documentada
- [x] Impacto por camada identificado — types/, services/, hooks/
- [x] Prioridade definida — Alta
- [x] Severidade definida — N/A
- [x] Complexidade sugerida — Média
- [x] Sem bloqueios — backend já implementou `/v1/dashboard`
