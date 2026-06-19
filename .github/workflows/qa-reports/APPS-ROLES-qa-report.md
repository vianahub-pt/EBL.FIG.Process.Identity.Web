---
story_ids: [STORY-058, STORY-059, STORY-060, STORY-061, STORY-064, STORY-065, STORY-022]
status: APROVADO
date: 2026-06-16
developer: dev-p
branch_apps: feature/apps-crud
branch_roles: feature/roles-crud
attempt: 1
---

# Relatório de QA — Apps CRUD + Roles Update

## Resumo
- **Status:** APROVADO
- **Data:** 2026-06-16
- **Developer:** dev-p
- **Tentativa:** 1
- **Histórias validadas:** STORY-058, STORY-059, STORY-060, STORY-061, STORY-064, STORY-065, STORY-022

---

## Bloco 1 — Apps CRUD (branch: feature/apps-crud)

### STORY-058 — GET /v1/apps/{id}

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Detalhe da app (id, tenantId, name, description, isActive) | Sucesso | ✅ Aprovado | `AppDetailSheet` exibe todos os campos via `useGetAppById` |
| Loading state | Borda | ✅ Aprovado | Skeleton renderizado durante `isLoading` |
| App não encontrada | Insucesso | ✅ Aprovado | Mensagem `apps.notFound` exibida quando `app` é undefined |

### STORY-059 — GET /v1/apps/paged

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Listagem paginada com search e isActive | Sucesso | ✅ Aprovado | `AppsPageClient` + `useGetAppsPaged` com parâmetros corretos |
| Filtro de pesquisa reseta página | Borda | ✅ Aprovado | `handleSearchChange` faz `setPageNumber(1)` |
| Filtro isActive reseta página | Borda | ✅ Aprovado | `handleIsActiveChange` faz `setPageNumber(1)` |
| Lista vazia | Borda | ✅ Aprovado | Mensagem `apps.empty` exibida |
| Loading state | Borda | ✅ Aprovado | Skeletons em `AppsList` |

### STORY-060 — POST /v1/apps/

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Criação bem-sucedida com name e description válidos | Sucesso | ✅ Aprovado | `useCreateApp` → `appsService.createApp` → `invalidateQueries` + toast |
| Campos em branco mostram erros de validação | Insucesso | ✅ Aprovado | Zod `min(1)` em name e description; `FormMessage` renderiza erros |
| Limite de caracteres name (max 200) | Borda | ✅ Aprovado | Zod `max(200)` + `maxLength={200}` no input |
| Limite de caracteres description (max 500) | Borda | ✅ Aprovado | Zod `max(500)` + `maxLength={500}` no input |
| Erro de API exibido via toast | Insucesso | ✅ Aprovado | `onError` → `apiError(err, t('create.error'))` |

### STORY-061 — PUT /v1/apps/{id}

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Atualização bem-sucedida (204) | Sucesso | ✅ Aprovado | `useUpdateApp` → `appsService.updateApp` → `invalidateQueries` + toast |
| Formulário pré-preenchido com dados da app | Borda | ✅ Aprovado | `form.reset({ name: app.name, description: app.description })` no `useEffect` |
| Validação Zod idêntica ao create | Borda | ✅ Aprovado | `updateAppSchema` — same rules as `createAppSchema` |

### STORY-064 — DELETE /v1/apps/{id}

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Eliminação confirmada via AlertDialog | Sucesso | ✅ Aprovado | `AlertDialog` com `AlertDialogAction` que invoca `remove(deletingApp.id)` |
| Cancelamento não elimina | Insucesso | ✅ Aprovado | `AlertDialogCancel` fecha o diálogo sem chamar o serviço |
| Toast de sucesso/erro | Borda | ✅ Aprovado | `useDeleteApp` — `onSuccess` e `onError` com toasts i18n |

### STORY-065 — POST /v1/apps/bulk-upload

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| CSV válido selecionado e submetido | Sucesso | ✅ Aprovado | `BulkUploadSheet` → `useBulkUploadApps` → `multipart/form-data` |
| Botão submit desabilitado sem ficheiro | Borda | ✅ Aprovado | `disabled={!selectedFile \|\| isPending}` |
| Input aceita apenas `.csv` | Borda | ✅ Aprovado | `accept=".csv"` no input file |
| Reset do estado após sucesso | Borda | ✅ Aprovado | `setSelectedFile(null)` + `inputRef.current.value = ''` + `onClose()` |

---

## Bloco 2 — Roles Update (branch: feature/roles-crud)

### STORY-022 — PUT /v1/roles/{id}

| Cenário | Tipo | Status | Observação |
|---------|------|--------|------------|
| Atualização bem-sucedida (name="Supervisor Senior") | Sucesso | ✅ Aprovado | `useUpdateRole` → `rolesService.updateRole` → `invalidateQueries` + toast |
| Formulário pré-preenchido | Borda | ✅ Aprovado | `form.reset({ name: role.name, description: role.description ?? '' })` |
| Erro 410 Gone tratado adequadamente | Insucesso | ✅ Aprovado | `onError` → `apiError` → `parseApiError` → `mapTitleToMessage("Gone")` → "Recurso não está mais disponível." |
| Validação name obrigatório (max 100) | Borda | ✅ Aprovado | Zod `min(1).max(100)` + `maxLength={100}` no input |
| description opcional (max 255) | Borda | ✅ Aprovado | Zod `max(255).optional()` + `maxLength={255}` no input |

---

## Validações Técnicas

| Comando | Status | Observação |
|---------|--------|------------|
| `npm run build` | ✅ Passou | Compilado com sucesso em 17.4s — sem erros TypeScript |
| `npm test` | ✅ Passou | Sem testes unitários escritos (`--passWithNoTests` configurado no package.json) |
| `npm run lint` | ✅ Passou | Sem erros ESLint |

---

## Verificações de Código

| Item | Status | Observação |
|------|--------|------------|
| Sem strings hardcoded visíveis ao utilizador | ✅ | Todas as strings JSX usam `useTranslations` / `getTranslations` |
| Estados de loading tratados | ✅ | `isLoading` com Skeleton em `AppsList` e `AppDetailSheet`; `isPending` desabilita botões |
| Estados de error tratados | ✅ | `onError` → `apiError()` em todos os mutations |
| TypeScript sem erros | ✅ | Build limpo, sem `any` injustificado |
| Validação Zod nos formulários | ✅ | `createAppSchema`, `updateAppSchema`, `updateRoleSchema` — todos com limites corretos |
| Sem dados sensíveis expostos | ✅ | Nenhum token, senha ou dado sensível em componentes cliente |
| React Query padrão (invalidateQueries) | ✅ | Todos os mutations invalidam a query key correspondente |
| i18n em ambos os idiomas (pt-BR + en-US) | ✅ | Chaves `apps.*` e `roles.*` presentes nos dois ficheiros de mensagens |
| Confirmação antes de deletar | ✅ | AlertDialog com título e descrição i18n |
| Paginação com `hasPreviousPage`/`hasNextPage` | ✅ | `AppsPagination` usa os flags da resposta da API |

---

## Bugs Encontrados

Nenhum bug encontrado.

---

## Decisão Final

**APROVADO** — Todas as 7 histórias movidas para `For Deploy`. Branches prontas para revisão humana.

- STORY-058 → `For Deploy`
- STORY-059 → `For Deploy`
- STORY-060 → `For Deploy`
- STORY-061 → `For Deploy`
- STORY-064 → `For Deploy`
- STORY-065 → `For Deploy`
- STORY-022 → `For Deploy`
