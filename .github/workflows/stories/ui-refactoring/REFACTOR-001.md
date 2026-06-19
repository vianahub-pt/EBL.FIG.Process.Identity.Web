---
id: REFACTOR-001
title: "Refatorar listagens com TanStack Table + shadcn/ui"
type: REFACTOR
status: For Deploy
resource: ui-components
priority: High
created_at: 2026-06-17
author: orquestrador
developer: dev-s
branch: feature/refactor-data-table
pr: ""
updated_at: 2026-06-17
---

# REFACTOR-001 — Refatorar listagens com TanStack Table + shadcn/ui

## Objetivo

Implementar um padrão de tabela reutilizável baseado em TanStack Table (React Table) com shadcn/ui para todas as páginas de listagem de recursos (Actions, Apps, Roles, etc.). Deve incluir:

- **Pesquisa** em tempo real
- **Ordenação** de colunas
- **Paginação** com seletor de tamanho de página
- **Seleção** de múltiplos itens (checkboxes)
- **Integração com React Query** para carregamento de dados
- **i18n** completo em português e inglês

## Contexto

Actualmente as listagens (Actions, Apps, etc.) usam componentes simples. Esta refatoração centraliza a lógica de tabela numa solução reutilizável e profissional.

## Stack

- **Instalação:** `npm install @tanstack/react-table`
- **Componentes base:** shadcn/ui (table, button, input, pagination, etc.)
- **Estado:** React Query + TanStack Table
- **Styling:** Tailwind CSS v4

## Critérios de Aceite

### CA-01: Componente reutilizável `DataTable`
- **Dado que** existem múltiplas páginas com listagens
- **Quando** um componente recebe `columns`, `data`, `pagination`, `sorting`, `filtering` como props
- **Então** renderiza tabela com TanStack Table configurado

### CA-02: Funcionalidades de tabela
- Pesquisa funcional (search global ou por coluna específica)
- Ordenação de colunas (ascending, descending)
- Paginação com page size selector (10, 20, 50, 100)
- Checkboxes para seleção de múltiplos itens
- Estado de loading e erro

### CA-03: Refatoração das páginas existentes
- `ActionsPageClient` migrada para TanStack Table
- `AppsPageClient` migrada para TanStack Table
- Demais páginas de listagem refatoradas conforme padrão

### CA-04: i18n completo
- Chaves i18n para labels de tabela: "Nome", "Descrição", "Estado", "Acções", etc.
- Paginação com "Página X de Y", "Mostrando N resultados"
- Selecione "X linhas" nas operações em massa

## Ficheiros a Criar

1. **`src/components/ui/data-table.tsx`** — componente base `<DataTable />` com TanStack Table
2. **`src/lib/utils/table-helpers.ts`** — utilitários para colunas, sorting, filtering
3. **`src/components/features/actions/ActionsPageClient.tsx`** (refatorar)
4. **`src/components/features/apps/AppsPageClient.tsx`** (refatorar)
5. **`src/components/features/roles/RolesPageClient.tsx`** (refatorar, se existir)

## Instruções

### Fase 1: Instalação e Componente Base
1. Executar `npm install @tanstack/react-table`
2. Criar `src/components/ui/data-table.tsx` com suporte a:
   - Columns (usando `ColumnDef` do TanStack Table)
   - Sorting
   - Filtering
   - Pagination
   - Row selection
   - Loading state
   - Empty state

### Fase 2: Refatoração de Páginas
1. Refatorar `ActionsPageClient` para usar `<DataTable />`
2. Refatorar `AppsPageClient` para usar `<DataTable />`
3. Manter a mesma funcionalidade (pesquisa, paginação, etc.)

### Fase 3: i18n
Adicionar chaves em `messages/pt-BR.json` e `messages/en-US.json`:
```json
{
  "table": {
    "paginating": {
      "previous": "Anterior",
      "next": "Próximo",
      "page": "Página",
      "of": "de",
      "pageSize": "Linhas por página",
      "showing": "Mostrando {{from}} até {{to}} de {{total}} resultados",
      "noResults": "Sem resultados"
    },
    "sorting": {
      "ascending": "Ascendente",
      "descending": "Descendente",
      "notSorted": "Não ordenado"
    },
    "selection": {
      "selectAll": "Seleccionar todos",
      "deselectAll": "Desseleccionar todos",
      "selected": "{{count}} seleccionado(s)"
    }
  }
}
```

## Cenários BDD

### Cenário 1: Tabela com sorting
```gherkin
Given tabela com coluna "Nome"
When clica no header "Nome"
Then tabela ordena crescente
When clica novamente
Then tabela ordena decrescente
```

### Cenário 2: Paginação
```gherkin
Given tabela com 50 items
When muda page size para 20
Then mostra página 1 com 20 items
When avança para página 2
Then mostra items 21-40
```

### Cenário 3: Pesquisa
```gherkin
Given tabela com items variados
When digita "termo" na pesquisa
Then tabela filtra em tempo real
```

### Cenário 4: Seleção
```gherkin
Given tabela com múltiplos items
When clica checkbox de item
Then item é seleccionado (marca o checkbox)
When clica "Seleccionar todos"
Then todos os items da página são seleccionados
```

## Referências

- [TanStack Table Docs](https://tanstack.com/table/v8/)
- [shadcn/ui Table](https://ui.shadcn.com/docs/components/table)
- Estrutura existente: `src/components/features/actions/` e `src/components/features/apps/`

## Notas Técnicas

- Use `'use client'` no `DataTable` (é um componente interactivo)
- TanStack Table é agnóstico em relação a UI — Use shadcn/ui para renderização
- Manter compatibilidade com React Query (não bloquear hooks existentes)
- Não modificar tipos de dados ou serviços (apenas a UI)
