## Handoff para QA — IMPROVE-001

### História
- ID: IMPROVE-001
- Título: Integração do Novo Endpoint /v1/dashboard para Consolidação de Métricas
- Ficheiro: `.github/workflows/stories/IMPROVE-001.md`
- Status: **For Tests**

### Implementação Concluída
- **Developer:** dev-p
- **Branch:** `feature/IMPROVE-001-dashboard-endpoint`
- **PR:** https://github.com/EBL.FIG/Process.Identity.Web/pull/001

### Resumo Executivo
Refactorização de 10 requisições HTTP separadas em **1 única requisição consolidada** para `GET /v1/dashboard`. Nenhuma mudança visual ou funcional — apenas otimização de performance do backend. A página de dashboard continua a consumir os mesmos dados no mesmo formato.

### Ficheiros Alterados
| Ficheiro | Mudança |
|----------|---------|
| `src/types/dashboard.types.ts` | ✨ **Criado** — Tipos `DashboardResponse`, `UserItem`, `AppItem` |
| `src/services/dashboard.service.ts` | 🔄 **Refatorado** — Novo método `getDashboard()`, remoção de 10 métodos antigos |
| `src/hooks/use-dashboard.ts` | 🔄 **Refatorado** — `useQuery` em vez de `useQueries` |
| `messages/pt-BR.json` | 📝 **Atualizado** — Adicionada chave `dashboard.error.loadFailed` |
| `messages/en-US.json` | 📝 **Atualizado** — Adicionada chave `dashboard.error.loadFailed` |

### Cenários BDD Implementados

#### ✅ Sucesso — Carregamento Consolidado
- **Cenário:** Utilizador autenticado navega para o dashboard
- **Implementação:** Hook `useDashboard()` usa `useQuery` com chave `['dashboard']` chamando `dashboardService.getDashboard()`
- **Resultado esperado:** 1 requisição única para `/v1/dashboard`, dados em cache React Query, métricas exibidas corretamente
- **Como testar:** Abrir DevTools → Network → carregar página, verificar apenas 1 requisição para `/v1/dashboard`

#### ❌ Insucesso — Erro na Requisição (500)
- **Cenário:** Servidor retorna HTTP 500
- **Implementação:** Hook retorna `isError = true` e `error` object
- **Resultado esperado:** Página exibe estado de erro, mensagem "Falha ao carregar métricas do dashboard. Por favor, tente novamente." (i18n pt-BR: `dashboard.error.loadFailed`)
- **Como testar:** Mock API para retornar 500, validar que componentes exibem estado de erro corretamente

#### ❌ Erro 401 — Token Expirado
- **Cenário:** Token OAuth expirado, requisição retorna 401
- **Implementação:** Interceptor Axios já existente em `src/lib/axios.ts` redireciona para `/login`
- **Resultado esperado:** Utilizador redirecionado para página de login, nenhum dado parcial exibido
- **Como testar:** Usar token expirado, verificar redirecionamento automático

#### ❌ Erro 403 — Sem Permissão
- **Cenário:** Utilizador sem role suficiente, requisição retorna 403
- **Implementação:** Hook captura erro em `isError = true`, página exibe mensagem
- **Resultado esperado:** Mensagem "Sem permissão para aceder aos dados do dashboard" (ou mensagem genérica)
- **Como testar:** Mock 403, validar exibição de erro apropriado

#### 💾 Cache — React Query Deduplicação
- **Cenário:** Utilizador abre página, dados são carregados; abre nova aba com mesma página
- **Implementação:** React Query com `queryKey: ['dashboard']` usa cache automaticamente
- **Resultado esperado:** Sem nova requisição (dados em cache), carregamento instantâneo
- **Como testar:** Abrir 2 abas, verificar que apenas 1 requisição foi feita ao total

#### ⚡ Concorrência — Duplo Clique / Recarregamento Rápido
- **Cenário:** Utilizador recarrega página rapidamente (duplo clique)
- **Implementação:** React Query deduplicates requisições automáticamente
- **Resultado esperado:** Apenas 1 requisição efetivada, ambas respostas recebem mesmo resultado
- **Como testar:** Simular duplo recarregamento rápido, verificar que apenas 1 requisição aparece no Network

### Validações Técnicas Confirmadas
- ✅ `npm run build` — Build completo bem-sucedido
- ✅ `npm test` — Testes passam (configuração OK, sem falhas)
- ✅ `npm run lint` — Lint sem erros (ESLint clean)

### Contrato da API
**Endpoint:** `GET /v1/dashboard`  
**Autenticação:** Bearer token  

**Resposta esperada (200 OK):**
```json
{
  "usersCount": 42,
  "usersStatus": [{ "id": 1, "isActive": true }],
  "rolesCount": 8,
  "actionsCount": 156,
  "resourcesCount": 73,
  "appsCount": 5,
  "appsStatus": [{ "id": 101, "isActive": true }],
  "tenantsCount": 3,
  "rolePermissionsCount": 524,
  "userRolesCount": 127
}
```

### Pontos de Atenção para QA
1. **Compatibilidade retroativa:** Página de dashboard não sofreu mudanças — ainda consome exatamente os mesmos dados
2. **Componentes afetados:** `MetricCard`, `UsersStatusChart`, `AppsStatusChart`, `ResourcesSummaryChart`, `UsersTenantsSummaryChart`
3. **i18n:** Nova chave de erro adicionada — validar se mensagens exibem corretamente em pt-BR e en-US
4. **Performance:** Verificar que agora é apenas 1 requisição (não 10)
5. **Edge cases:** Campos null/undefined no response — hook aplica valores padrão (arrays vazios, 0 para counts)

### Critérios de Aceite — Checklist para QA
- [ ] Página de dashboard carrega com apenas 1 requisição para `/v1/dashboard`
- [ ] Todas as 8 métricas (users, roles, actions, resources, apps, tenants, permissions, userRoles) exibem corretamente
- [ ] Gráficos (Users Status Chart, Apps Status Chart) renderizam sem erros
- [ ] Erro 500: mensagem "Falha ao carregar métricas do dashboard. Por favor, tente novamente." exibida
- [ ] Erro 401: redirecionamento automático para `/login`
- [ ] Cache funciona — recarregar aba não faz nova requisição
- [ ] Duplo clique / recarregamento rápido não duplica requisições
- [ ] Lint clean: `npm run lint` sem erros
- [ ] Build clean: `npm run build` sem erros ou warnings
- [ ] Testes OK: `npm test` passa
- [ ] i18n: Mensagens em português e inglês exibem corretamente
- [ ] Sem regressões visuais na página de dashboard

### Próximos Passos (QA)
1. Executar testes manuais conforme cenários BDD acima
2. Validar network requests (apenas 1 request para `/v1/dashboard`)
3. Testar edge cases (resposta malformada, valores null)
4. Aprovar/rejeitar conforme critérios de aceite
5. Comentar em PR com resultado final

---

**Nota:** Implementação segue padrão feature-based do projeto. Sem dependências externas novas. Compatibilidade 100% com componentes existentes.
