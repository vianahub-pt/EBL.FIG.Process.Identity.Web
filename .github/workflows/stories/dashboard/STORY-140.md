---
id: STORY-140
title: "Dashboard / Home com gráficos dos recursos do sistema"
type: STORY
status: For Tests
resource: dashboard
priority: High
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-s
branch: feature/story-140-dashboard
pr: ""
branch: ""
pr: ""
---

# STORY-140 — Dashboard / Home com gráficos dos recursos do sistema

## Como utilizador autenticado
Eu quero ver um dashboard com métricas e gráficos dos recursos do sistema
Para que possa ter uma visão geral rápida do estado da plataforma

## Depende de
- TASK-138 (scaffolding concluído)
- STORY-139 (login funcional)

## Autenticação
Sim — Bearer Token JWT obrigatório. Rota protegida. Redirecionar para `/login` se não autenticado.

## Endpoints Consumidos
Os dados dos gráficos são obtidos através dos endpoints de listagem existentes na API:

| Recurso | Endpoint | Dados para gráfico |
|---------|----------|-------------------|
| Utilizadores | GET /v1/users (com paginação) | Total de utilizadores, activos vs inactivos |
| Roles | GET /v1/roles | Total de roles por tenant |
| Actions | GET /v1/actions | Total de actions |
| Resources | GET /v1/resources | Total de resources |
| Apps | GET /v1/apps | Total de apps, activas vs inactivas |
| Tenants | GET /v1/tenants | Total de tenants |
| Role Permissions | GET /v1/role-permissions | Total de permissões |
| User Roles | GET /v1/user-roles | Distribuição de roles por utilizadores |

## UI — Especificação

### Layout Mobile-First

#### Mobile (base)
- Header com: logo, nome do utilizador, avatar, dropdown (perfil, idioma, tema, logout)
- Cards de métricas em 1 coluna
- Gráficos em 1 coluna, full-width
- Sidebar colapsada → abre como Sheet/Drawer lateral

#### Tablet (md)
- Cards de métricas em 2 colunas
- Gráficos em 2 colunas

#### Desktop (lg+)
- Sidebar fixa à esquerda (colapsável)
- Cards de métricas em 4 colunas
- Gráficos em 2-3 colunas

### Componentes shadcn/ui
- `Sidebar` (do shadcn sidebar component)
- `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`
- `Badge`
- `Avatar`, `AvatarImage`, `AvatarFallback`
- `DropdownMenu`
- `Sheet` (sidebar mobile)
- `Tabs` (para alternar vistas dos gráficos)
- `Skeleton` (loading state)

### Biblioteca de Gráficos
- **Recharts** (já instalado no TASK-138)

### Cards de Métricas (KPI Cards)
8 cards, cada um exibindo:
- Ícone (lucide-react)
- Título do recurso (i18n)
- Valor total
- Variação (badge: +N este mês) — se disponível

| Card | Ícone | Recurso |
|------|-------|---------|
| Total de Utilizadores | `Users` | /v1/users |
| Total de Roles | `Shield` | /v1/roles |
| Total de Actions | `Zap` | /v1/actions |
| Total de Resources | `Database` | /v1/resources |
| Total de Apps | `AppWindow` | /v1/apps |
| Total de Tenants | `Building2` | /v1/tenants |
| Total de Permissões | `Lock` | /v1/role-permissions |
| User-Roles atribuídos | `UserCheck` | /v1/user-roles |

### Gráficos (Recharts)

#### Gráfico 1: Utilizadores por Status
- Tipo: `PieChart` / `DonutChart`
- Dados: activos vs inactivos (campo `isActive` dos utilizadores)
- Cores: verde (activo), vermelho (inactivo)

#### Gráfico 2: Apps por Status
- Tipo: `BarChart` horizontal
- Dados: activas vs inactivas por app

#### Gráfico 3: Distribuição de Roles
- Tipo: `BarChart` vertical
- Dados: quantidade de utilizadores por role

#### Gráfico 4: Roles e Permissões
- Tipo: `BarChart` agrupado
- Dados: por role — número de actions e resources associados

### Sidebar / Navegação
Menu lateral com as secções:
- Dashboard (home) — ícone `LayoutDashboard`
- Utilizadores — ícone `Users`
- Roles — ícone `Shield`
- Actions — ícone `Zap`
- Resources — ícone `Database`
- Apps — ícone `AppWindow`
- Tenants — ícone `Building2`
- Permissões (Role Permissions) — ícone `Lock`
- User-Roles — ícone `UserCheck`
- Jobs — ícone `Clock`
- Configurações — ícone `Settings` (toggle de tema e idioma)
- Admin (secção separada, visível apenas para admins) — ícone `ShieldAlert`

### Header
- Logo da aplicação "Identity"
- Título da página activa
- Botão toggle sidebar (mobile)
- Avatar do utilizador com dropdown:
  - Nome e email
  - Separador
  - "Perfil" (link)
  - "Idioma" → submenu (pt-BR, en-US)
  - "Tema" → submenu (Claro, Escuro, Sistema)
  - Separador
  - "Terminar sessão" (logout → clear auth.store + redirect /login)

## Ficheiros a Criar/Alterar
- `src/app/[locale]/(protected)/layout.tsx` (layout com sidebar + header)
- `src/app/[locale]/(protected)/page.tsx` (dashboard page)
- `src/components/layout/AppSidebar.tsx`
- `src/components/layout/AppHeader.tsx`
- `src/components/layout/ThemeToggle.tsx`
- `src/components/layout/LanguageSwitcher.tsx`
- `src/components/features/dashboard/MetricCard.tsx`
- `src/components/features/dashboard/UsersStatusChart.tsx`
- `src/components/features/dashboard/AppsStatusChart.tsx`
- `src/components/features/dashboard/RolesDistributionChart.tsx`
- `src/components/features/dashboard/RolesPermissionsChart.tsx`
- `src/hooks/use-dashboard.ts` (useQueries para todos os endpoints do dashboard)
- `messages/pt-BR.json` (actualizar com chaves de dashboard e navegação)
- `messages/en-US.json` (actualizar)

## Textos i18n
Adicionar em `messages/pt-BR.json`:
```json
{
  "navigation": {
    "dashboard": "Dashboard",
    "users": "Utilizadores",
    "roles": "Funções",
    "actions": "Ações",
    "resources": "Recursos",
    "apps": "Aplicações",
    "tenants": "Inquilinos",
    "rolePermissions": "Permissões de Função",
    "userRoles": "Funções de Utilizador",
    "jobs": "Trabalhos",
    "settings": "Configurações",
    "admin": "Administração"
  },
  "dashboard": {
    "title": "Dashboard",
    "metrics": {
      "users": "Total de Utilizadores",
      "roles": "Total de Funções",
      "actions": "Total de Ações",
      "resources": "Total de Recursos",
      "apps": "Total de Aplicações",
      "tenants": "Total de Inquilinos",
      "permissions": "Total de Permissões",
      "userRoles": "Funções Atribuídas"
    },
    "charts": {
      "usersByStatus": "Utilizadores por Status",
      "appsByStatus": "Aplicações por Status",
      "rolesDistribution": "Distribuição de Funções",
      "rolesPermissions": "Funções e Permissões",
      "active": "Activos",
      "inactive": "Inactivos"
    }
  }
}
```
Equivalente em `messages/en-US.json`.

## Critérios de Aceite

### CA-01: Acesso autenticado
- **Dado que** o utilizador autenticado acede a `/{locale}/`
- **Quando** a página carrega
- **Então** exibe o dashboard com os 8 KPI cards

### CA-02: Loading state
- **Dado que** a API está a carregar dados
- **Quando** a página carrega
- **Então** os cards e gráficos mostram skeletons

### CA-03: Gráficos funcionais
- **Dado que** os dados foram carregados
- **Quando** o utilizador visualiza o dashboard
- **Então** os 4 gráficos são exibidos com dados correctos

### CA-04: Responsividade
- **Dado que** o utilizador acede em smartphone
- **Quando** a página carrega
- **Então** sidebar está colapsada, cards em 1 coluna, gráficos full-width

### CA-05: Navegação
- **Dado que** o utilizador está no dashboard
- **Quando** clica num item da sidebar
- **Então** navega para a rota correspondente

### CA-06: Logout
- **Dado que** o utilizador clica em "Terminar sessão"
- **Quando** confirma
- **Então** tokens são removidos e é redirecionado para `/login`

## Cenários BDD

### Cenário 1: Dashboard carrega com sucesso
```gherkin
Given o utilizador está autenticado com token válido
When acede a "/pt-BR/"
Then o sistema chama os 8 endpoints de listagem em paralelo
And exibe os 8 KPI cards com os totais
And exibe os 4 gráficos com os dados
```

### Cenário 2: Acesso não autenticado
```gherkin
Given o utilizador não está autenticado
When tenta aceder a "/pt-BR/"
Then o middleware redireciona para "/pt-BR/login"
```

### Cenário 3: Alternância de tema no dashboard
```gherkin
Given o utilizador está no dashboard
When clica em "Tema Escuro" no dropdown do header
Then toda a aplicação muda para o tema escuro
And a preferência é guardada no localStorage
```
