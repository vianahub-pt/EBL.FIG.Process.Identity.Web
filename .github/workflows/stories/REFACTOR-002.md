---
id: REFACTOR-002
title: "Componentizar o Resource Grid da página /actions em componente genérico e reutilizável"
type: refactor
priority: Média
severity: N/A
complexity: Média
status: For Deploy
developer: dev-s
branch: feature/REFACTOR-002-resource-grid-generic
pr: "pending — remote não configurado; push manual necessário"
created_at: 2026-06-18
updated_at: 2026-06-18
---

# REFACTOR-002: Componentizar o Resource Grid da página /actions em componente genérico e reutilizável

## Descrição
Como developer do projeto, quero que o componente `ResourceGrid` seja genérico e desacoplado de qualquer feature específica, para que possa ser reutilizado em qualquer página (actions, apps, roles, etc.) sem duplicação de código.

## Classificação
- **Tipo:** refactor
- **Prioridade:** Média
- **Severidade:** N/A
- **Complexidade sugerida pelo PO:** Média
- **Developer provável:** dev-p
- **Motivo da complexidade:** Refatoração de componentes de UI com substituição de elementos por shadcn e generalização da API pública do componente; sem lógica de negócio nova, mas exige atenção ao contrato de props e compatibilidade com múltiplas páginas.

## Contexto
A página `/actions` implementa um padrão de grid (filtros + lista + paginação) que é replicado manualmente nas páginas `/apps` e `/roles`. O componente `src/components/ui/resource-grid.tsx` existe mas ainda não é verdadeiramente genérico. Os controlos de filtro (botões de status), input de pesquisa e paginação usam elementos customizados que devem ser migrados para os componentes shadcn/ui (`Select`, `Input`, `Pagination`, `Button`) para garantir consistência visual e de acessibilidade.

Os 5 requisitos abaixo devem ser implementados no `ResourceGrid` de forma agnóstica à feature:

1. **Filtro de status → Select shadcn:** Os 3 botões "Todos", "Ativo", "Inativo" devem ser substituídos por um `Select` do shadcn com opção default "Todos".
2. **Input de pesquisa → Input shadcn:** O input de pesquisa deve usar o componente `Input` do shadcn e estar na mesma linha que o Select de status, mantendo o tamanho atual.
3. **Botões de ação → Button Group:** "Importar CSV" e "Nova Ação" (e equivalentes em outras páginas) devem ser agrupados num Button Group, mantendo a posição atual.
4. **Paginação → Pagination shadcn:** Substituir o controlo de paginação existente pelo componente `Pagination` do shadcn na mesma posição.
5. **Select "Linhas por página" ao lado da Pagination:** Na mesma linha da Pagination, alinhado à direita, adicionar um `Select` do shadcn com opções de "Linhas por página".

## Critérios de Aceite
- [ ] O Select de status renderiza com "Todos" selecionado por padrão e inclui as opções "Ativo" e "Inativo"
- [ ] O Input de pesquisa utiliza o componente `Input` do shadcn
- [ ] O Input de pesquisa e o Select de status estão na mesma linha do cabeçalho do grid
- [ ] Os botões de ação estão agrupados num Button Group na posição original
- [ ] O componente `Pagination` do shadcn substitui o controlo de paginação anterior
- [ ] O `Select` "Linhas por página" está alinhado à direita na mesma linha da Pagination
- [ ] O componente `ResourceGrid` aceita props genéricas e funciona nas páginas `/actions`, `/apps` e `/roles` sem alterações na lógica de cada feature
- [ ] Os testes existentes passam sem regressão

---

## Cenário de Sucesso — Select de status renderiza com default "Todos"
**Dado que** o utilizador acede à página `/actions`  
**Quando** a página carrega  
**Então** vê um Select com a opção "Todos" selecionada por padrão, com as opções "Ativo" e "Inativo" disponíveis

## Cenário de Sucesso — Input de pesquisa e Select na mesma linha
**Dado que** o utilizador está na página `/actions`  
**Quando** visualiza o cabeçalho do grid  
**Então** o Input de pesquisa e o Select de status estão dispostos na mesma linha horizontal

## Cenário de Sucesso — Button Group "Importar CSV" e "Nova Ação"
**Dado que** o utilizador está na página `/actions`  
**Quando** visualiza o cabeçalho do grid  
**Então** os botões "Importar CSV" e "Nova Ação" aparecem agrupados (Button Group) na posição original

## Cenário de Sucesso — Pagination shadcn no rodapé do grid
**Dado que** o utilizador está na página `/actions` com múltiplas páginas de resultados  
**Quando** visualiza o rodapé do grid  
**Então** vê o componente `Pagination` do shadcn no lugar do controlo de paginação anterior

## Cenário de Sucesso — Select "Linhas por página" alinhado à direita
**Dado que** o utilizador está no rodapé do grid  
**Quando** visualiza a linha da Pagination  
**Então** há um Select "Linhas por página" alinhado à direita na mesma linha do componente Pagination

## Cenário de Sucesso — Componente genérico reutilizável
**Dado que** o componente `ResourceGrid` está implementado com a nova API de props genéricas  
**Quando** é utilizado nas páginas `/apps` ou `/roles`  
**Então** renderiza corretamente sem alterações na lógica específica de cada feature

## Cenário de Insucesso — Filtro de status inválido
**Dado que** o componente recebe um valor de status não reconhecido via props  
**Quando** o Select de status é renderizado  
**Então** o valor "Todos" é apresentado como fallback e não ocorre erro de runtime

## Cenário de Insucesso — Lista vazia após filtro
**Dado que** o utilizador aplica um filtro de status que não retorna resultados  
**Quando** o grid renderiza  
**Então** é apresentada uma mensagem de estado vazio e os controlos de filtro permanecem visíveis e funcionais

## Cenários de Borda
- **Validação:** props obrigatórias em falta no `ResourceGrid` devem gerar erro de TypeScript em tempo de compilação, não em runtime
- **Permissão:** botões de ação (ex: "Nova Ação") devem ser ocultados se o utilizador não tiver permissão, sem quebrar o layout
- **Estado vazio:** com lista sem resultados, a Pagination deve estar oculta ou desativada e o Select "Linhas por página" não deve gerar erros
- **Concorrência:** duplo clique em botão de ação (ex: "Nova Ação") não deve abrir dois sheets simultaneamente

---

## Impacto Técnico
- **Camadas afetadas:** `components/ui/`, `components/features/actions/`, `components/features/apps/`, `components/features/roles/`
- **Páginas/Rotas:** `/actions`, `/apps`, `/roles`
- **Componentes:**
  - `src/components/ui/resource-grid.tsx` — refatoração principal
  - `src/components/features/actions/ActionsPageClient.tsx` — consumidor
  - `src/components/features/actions/ActionsList.tsx` — consumidor
  - `src/components/features/actions/ActionsFilters.tsx` — substituição por Select + Input shadcn
  - `src/components/features/actions/ActionsPagination.tsx` — substituição por Pagination shadcn
  - Equivalentes em `apps/` e `roles/` se existirem
- **Hooks:** nenhum novo hook necessário; hooks existentes (`use-actions.ts`, `use-apps.ts`, `use-roles.ts`) não são alterados
- **Serviços/API calls:** nenhum; refactor é exclusivamente de UI
- **Estado global:** nenhum; estado de filtro e paginação permanece local nos hooks/componentes existentes
- **Formulários:** não aplicável
- **Testes:** componentes `ActionsFilters`, `ActionsPagination`, `ResourceGrid` devem ter testes unitários atualizados ou criados
- **i18n:** adicionar chaves em `messages/pt-BR.json` e `messages/en-US.json` para:
  - `common.filter.all` → "Todos" / "All"
  - `common.filter.active` → "Ativo" / "Active"
  - `common.filter.inactive` → "Inativo" / "Inactive"
  - `common.pagination.rowsPerPage` → "Linhas por página" / "Rows per page"
- **Dependências:** `shadcn/ui` (Select, Input, Pagination, Button) — já presente no projeto

## Definition of Ready
- [x] Requisitos de negócio claros
- [x] Critérios de aceite objetivos e verificáveis
- [x] Cenário de sucesso definido com Dado/Quando/Então
- [x] Cenário de insucesso definido com Dado/Quando/Então
- [x] Cenários de borda identificados
- [x] Contrato de API conhecido (refactor de UI — sem chamadas de API novas)
- [x] Impacto por camada identificado
- [x] Prioridade definida
- [x] Severidade definida (N/A — refactor)
- [x] Complexidade sugerida definida
- [x] Sem bloqueios para o Developer iniciar
