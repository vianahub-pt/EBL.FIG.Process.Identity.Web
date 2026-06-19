---
id: REFACTOR-001
title: "Sincronizar tipos TypeScript com novos DTOs de Response da API"
type: refactor
priority: Alta
severity: Alta
complexity: Alta
status: For Tests
developer: dev-s
branch: feature/REFACTOR-001-sync-api-types
pr: N/A
created_at: 2026-06-17
updated_at: 2026-06-17
status: For Deploy
updated_at: 2026-06-17
qa_report: .github/workflows/qa-reports/REFACTOR-001-qa-report.md
---

# REFACTOR-001: Sincronizar tipos TypeScript com novos DTOs de Response da API

## Descrição

Como desenvolvedor da aplicação Web (React + Next.js), quero atualizar todos os tipos TypeScript para alinhar com as mudanças significativas nos DTOs de Response da API, para que a aplicação funcione corretamente com o novo contrato de dados.

## Classificação

- **Tipo:** refactor
- **Prioridade:** Alta
- **Severidade:** Alta
- **Complexidade sugerida pelo PO:** Alta
- **Developer provável:** dev-s (Senior)
- **Motivo da complexidade:** Refatoração estrutural que afeta múltiplas camadas (types → services → stores → hooks → componentes), com impacto direto em autenticação, estado global e fluxo de dados. Requer análise detalhada de dependências e garantia de compatibilidade sem quebra de contrato.

---

## Contexto

A API foi refatorada com mudanças significativas em Response DTOs:

### ActionResponse / ActionDetailResponse
- **Nova:** campo `Tenant` (string) — identificação do tenant
- **Nova:** campo `Application` (string) — identificação da aplicação

### AppResponse / AppDetailResponse
- **Removida:** campo `tenantId` (int)
- **Nova:** campo `Tenant` (string) — nome do tenant
- **Removida:** campo `ApplicationId` (não existia, mas implícito em App)

### RoleResponse / RoleDetailResponse
- **Nova:** campo `Tenant` (string) — identificação do tenant
- **Nova:** campo `Application` (string) — identificação da aplicação
- **Nova:** campo `IsActive` (bool) — status de ativação da role
- **Nota:** `Name` e `Description` mantidas

### AuthDetailResponse — Mudança completa
**Antes (LoginResponse/RefreshTokenResponse):**
```
{
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: string
  refreshTokenExpiresAt: string
  tenantId: number
  tenantName: string
  userId: number
  userName: string
  urlImage: string | null
  roles: string[]  ← REMOVIDA
}
```

**Depois (AuthDetailResponse):**
```
{
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: DateTime
  refreshTokenExpiresAt: DateTime | null
  tenantId: int
  tenantName: string
  appId: int         ← NOVO
  appName: string    ← NOVO
  userId: int
  userName: string
  roleId: int        ← NOVO (singular)
  roleName: string   ← NOVO
}
```

**Impacto crítico:** Remover `roles: string[]` quebra `auth.store.ts` e todos os componentes que usam `useAuthStore((s) => s.user.roles)`.

---

## Critérios de Aceite

- [ ] Tipo `Action` em `src/types/actions.types.ts` atualizado com `tenant: string` e `application: string`
- [ ] Tipo `App` em `src/types/apps.types.ts` atualizado: remover `tenantId: number`, adicionar `tenant: string`
- [ ] Tipo `Role` em `src/types/roles.types.ts` atualizado com `tenant: string`, `application: string`, `isActive: boolean`
- [ ] Tipo `LoginResponse` e `RefreshTokenResponse` em `src/types/auth.types.ts` atualizado para refletir novo contrato (com `appId`, `appName`, `roleId`, `roleName` e sem `roles: string[]`)
- [ ] Interface `AuthUser` em `src/stores/auth.store.ts` refatorada para remover `roles: string[]` e adicionar `appId`, `appName`, `roleId`, `roleName`
- [ ] Store `auth.store.ts` método `setAuth()` atualizado para aceitar novos campos
- [ ] Store `auth.store.ts` método `setTokens()` mantém assinatura sem alteração
- [ ] Hook `use-auth.ts` refatorado para passar novos campos ao `setAuth()`
- [ ] Todos os componentes que consomem `useAuthStore((s) => s.user.roles)` identificados e ajustados (substituir por lógica de role singular via `roleId`/`roleName`)
- [ ] Serviços em `src/services/` (actions.service.ts, apps.service.ts, roles.service.ts) validados — confirmar que não realizam mapeamento manual que quebre com novos tipos
- [ ] Build `npm run build` executa sem erros de TypeScript
- [ ] Testes `npm test` passam 100% — sem regressions
- [ ] Lint `npm run lint` executa sem erros

---

## Cenários de Negócio

### Cenário de Sucesso — Autenticação com novo contrato AuthDetailResponse

**Dado que** um utilizador válido efetua login com credenciais corretas (loginIdentifier + password)  
**Quando** a API retorna AuthDetailResponse com campos `appId`, `appName`, `roleId`, `roleName` (sem `roles: string[]`)  
**Então** a aplicação Web carrega sem erros de tipo, o `auth.store` armazena corretamente os novos campos, e o utilizador é redirecionado para a página protegida `/` com contexto de autenticação válido e acessível

### Cenário de Insucesso — Tipos incompatíveis impedem execução

**Dado que** o tipo `LoginResponse` não foi atualizado para o novo contrato da API  
**Quando** o hook `use-auth.ts` tenta passar `roles: string[]` (que não existe mais na response) para `setAuth()`  
**Então** TypeScript/ESLint rejeita o código com erro de tipo, e o build falha antes de atingir o navegador

### Cenários de Borda

#### Borda 1: Componentes legados que usam `roles` array
- **Dado que** componentes antigos consomem `useAuthStore((s) => s.user.roles)` (ex: componentes de sidebar com permissões baseadas em múltiplos roles)
- **Quando** refatoração remove `roles: string[]` de `AuthUser`
- **Então** esses componentes devem ser identificados, listados no PR e migrados para usar `roleId`/`roleName` singular, OU criar um computed selector no store que derive `roles` de `roleId`/`roleName` por compatibilidade temporária

#### Borda 2: Refresh token após atualização
- **Dado que** um utilizador está autenticado com a versão antiga, sessão ainda válida
- **Quando** faz refresh token via `useRefreshToken()` hook
- **Então** o novo `AuthDetailResponse` é recebido, store é atualizado com novos campos, tokens refreshed, aplicação continua funcional

#### Borda 3: Campos Action/App/Role agora com tenant/application como strings
- **Dado que** componentes em `src/components/features/actions/`, `src/components/features/apps/`, `src/components/features/roles/` renderizam listas de recursos
- **Quando** tipos `Action`, `App`, `Role` agora recebem `tenant: string`, `application: string` (não IDs)
- **Então** componentes que renderizavam nomes derivados de `tenantId` (ex: via lookup table) devem aceitar `tenant: string` direto, sem necessidade de traducção adicional

---

## Impacto Técnico

### Camadas Afetadas

| Camada | Ficheiro | Tipo de Mudança |
|--------|----------|-----------------|
| **Types** | `src/types/actions.types.ts` | Adicionar `tenant: string`, `application: string` |
| **Types** | `src/types/apps.types.ts` | Remover `tenantId: number`, adicionar `tenant: string` |
| **Types** | `src/types/roles.types.ts` | Adicionar `tenant: string`, `application: string`, `isActive: boolean` |
| **Types** | `src/types/auth.types.ts` | Refatorar `LoginResponse`, `RefreshTokenResponse` (remover `roles`, adicionar `appId`, `appName`, `roleId`, `roleName`) |
| **Stores** | `src/stores/auth.store.ts` | Refatorar `AuthUser`, método `setAuth()`, remover `roles` |
| **Hooks** | `src/hooks/use-auth.ts` | Atualizar mapeamento de dados do login/refresh para novos campos |
| **Services** | `src/services/auth.service.ts` | Validar tipos de request/response (sem mudança de lógica esperada) |
| **Services** | `src/services/actions.service.ts` | Validar tipos de response |
| **Services** | `src/services/apps.service.ts` | Validar tipos de response |
| **Services** | `src/services/roles.service.ts` | Validar tipos de response |
| **Components** | `src/components/` | Atualizar componentes que consumem `roles`, `tenantId`, `Application` (em feature-specific: actions, apps, roles) |
| **Testes** | `src/**/__tests__` ou `*.test.ts` | Atualizar mocks de API response |

### Pesquisa Prévia (não substitui análise do Developer)

**Componentes que podem consumir `roles`:**
```bash
grep -r "\.roles" src/components/ src/hooks/
grep -r "tenantId" src/types/ src/components/
grep -r "useAuthStore" src/components/
```

**Resultado esperado:** Identificar todos os pontos de quebra antes de refatorar.

### Fluxo de Dados Esperado (pós-refatoração)

```
Page → Component
    ↓
Hook (useLogin/useRefreshToken)
    ↓
Service (authService.login/refresh)
    ↓
API Response (AuthDetailResponse com appId, roleId)
    ↓
Zustand Store (setAuth → AuthUser com appId, roleId)
    ↓
Component consuma useAuthStore (acesso a user.appId, user.roleId, user.roleName)
```

### Risco de Regressão

- **Autenticação quebrada:** Se `roles` for removido sem estratégia, componentes falham silenciosamente
- **Type safety perdida:** Se types não forem atualizados completamente, build passa mas runtime falha
- **Refresh token quebrado:** Se `setTokens()` não mantiver a mesma assinatura, fluxo de refresh falha

---

## Definition of Ready

- [x] Requisitos de negócio claros — API alterou contratos de Response, Web precisa acompanhar
- [x] Critérios de aceite objetivos e verificáveis — tipos específicos listados, build/lint/test obrigatórios
- [x] Cenário de sucesso definido — login com novo contrato funciona
- [x] Cenário de insucesso definido — tipos incompatíveis quebram build
- [x] Cenários de borda identificados — roles legacy, refresh token, tenant/application como strings
- [x] Contrato de API conhecido — Response DTOs analisados e documentados acima
- [x] Impacto por camada identificado — types, stores, hooks, services, components listados
- [x] Prioridade definida — Alta (bloqueia funcionalidade crítica)
- [x] Severidade definida — Alta (afeta autenticação)
- [x] Complexidade sugerida definida — Alta (refatoração multi-camada com risco de regressão)
- [x] Sem bloqueios para o Developer iniciar — API foi refatorada, tipos estão disponíveis, nenhuma dependência externa

---

## Artefatos de Resultado Esperado

### Ficheiros Atualizados (Mínimo)
1. `src/types/actions.types.ts` — tipos `Action`, `ActionDetail`
2. `src/types/apps.types.ts` — tipo `App`, `AppDetail`
3. `src/types/roles.types.ts` — tipo `Role`, `RoleDetail`
4. `src/types/auth.types.ts` — tipos `LoginResponse`, `RefreshTokenResponse`
5. `src/stores/auth.store.ts` — refatoração de `AuthUser`, `setAuth()`, lógica de cleanup
6. `src/hooks/use-auth.ts` — mapeamento de payload do login/refresh

### Ficheiros Potencialmente Afetados (Validação)
- `src/services/*.service.ts` — confirmar que tipos continuam compatíveis
- `src/components/features/*/` — componentes que usam `roles`, `tenantId`, `Application`
- Testes unitários e e2e — atualizar mocks

### Artefatos de Revisão (PR)
- **Commit message:** Descrever mudança de contrato (removida `roles`, adicionada `appId`/`roleId`)
- **PR description:** Listar todos os ficheiros alterados e justificar
- **Checklist de testes:** Build ✓, Lint ✓, Testes ✓

---

## Notas Técnicas

1. **Versionamento de tipos:** Não criar tipos compatíveis "dois em um" (`LoginResponse | LoginResponseV2`). A refatoração é direta, sem suporte a ambas as versões.
2. **Zustand persistence:** Verificar se `partialize` em `auth-storage` middleware precisa ser atualizado.
3. **Cookie de autenticação:** Verificar se `document.cookie = 'auth-storage=...'` em `setAuth()` precisa ajuste.
4. **i18n:** Nenhuma mudança esperada em chaves de mensagem (lógica de negócio não muda, apenas estrutura de dados).
5. **E2E testes:** Se existirem em `.github/workflows/` ou `e2e/`, atualizar mocks/fixtures de login response.

---

## Stack & Dependências

- React 19 + Next.js 16 (App Router)
- TypeScript 5
- Zustand (persist middleware)
- React Query
- Axios (api client)

Nenhuma nova dependência necessária.
