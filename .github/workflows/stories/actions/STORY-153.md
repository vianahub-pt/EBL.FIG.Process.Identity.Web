---
id: STORY-153
title: "Refatorar grid de /actions para componente genérico reutilizável"
type: story
priority: Alta
severity: Média
complexity: Alta
status: For Deploy
developer: dev-s
branch: N/A
pr: N/A
created_at: 2026-06-17
updated_at: 2026-06-17
---

# STORY-153: Refatorar grid de /actions para componente genérico reutilizável

## Descrição
Como utilizador autenticado da área administrativa, quero que a listagem de ações use um grid genérico desacoplado de domínio, para que a experiência da tabela seja consistente e reutilizável em qualquer página de recursos.

## Classificação
- **Tipo:** story
- **Prioridade:** Alta
- **Severidade:** Média
- **Complexidade sugerida pelo PO:** Alta
- **Developer provável:** dev-s
- **Motivo da complexidade:** envolve refatoração estrutural de componente de listagem com desacoplamento de domínio, substituição de elementos de interação em múltiplas áreas da UI e garantia de reutilização sem regressão funcional.

## Contexto
A página `/actions` possui uma implementação de grid e controles de listagem acoplados ao domínio de Actions. A iniciativa exige transformar essa estrutura em componente genérico reutilizável por qualquer recurso, mantendo comportamento funcional e layout atual. O objetivo é padronizar filtros, pesquisa, ações de topo e navegação/paginação com componentes do shadcn/ui, sem perda de usabilidade e sem regressão da experiência existente.

## Critérios de Aceite
- [ ] O grid de listagem usado em `/actions` é refatorado para componente genérico e reutilizável, sem acoplamento a entidades de Actions.
- [ ] Os botões de filtro "Todos", "Ativo" e "Inativo" são substituídos por `Select` do shadcn, com valor default "Todos".
- [ ] O campo de pesquisa é `Input` do shadcn e permanece na mesma linha do `Select` de status, mantendo o tamanho visual atual.
- [ ] Os botões "Importar CSV" e "Nova Ação" são apresentados como Button Group na mesma posição atual da interface.
- [ ] O espaço hoje ocupado por "Linhas por página" passa a exibir `Pagination` do shadcn.
- [ ] Na mesma linha da `Pagination`, alinhado à direita, permanece `Select` do shadcn para "Linhas por página".
- [ ] A página `/actions` mantém carregamento, estados de erro/vazio e interação de listagem sem regressões funcionais.
- [ ] Estrutura final permite reaproveitamento do componente em outras páginas sem dependências de `actions`.

---

## Cenário de Sucesso — Grid genérico aplicado em /actions com layout atualizado
**Dado que** o utilizador autenticado acede à página `/actions` com dados disponíveis  
**Quando** a listagem é renderizada com o novo componente genérico  
**Então** o grid é exibido corretamente com colunas e dados esperados  
**E** o filtro de status aparece como `Select` do shadcn com default "Todos"  
**E** o `Input` de pesquisa aparece na mesma linha do `Select`, mantendo o tamanho atual  
**E** "Importar CSV" e "Nova Ação" aparecem como Button Group na mesma posição atual  
**E** a `Pagination` do shadcn é exibida no local do controlo antigo  
**E** o `Select` de "Linhas por página" permanece na mesma linha da paginação, alinhado à direita.

## Cenário de Insucesso — Erro de carregamento da listagem
**Dado que** o utilizador acede à página `/actions` e ocorre falha na obtenção de dados  
**Quando** a listagem tenta carregar no componente genérico  
**Então** a interface apresenta estado de erro consistente com o padrão da aplicação  
**E** não ocorre quebra de layout nos controles (`Select`, `Input`, Button Group, `Pagination`)  
**E** o utilizador consegue tentar nova consulta conforme padrão existente da página.

## Cenários de Borda
- **Validação:** seleção de status inválida não prevista no `Select` não deve ser aplicada; pesquisa vazia deve equivaler ao estado sem filtro de texto.
- **Permissão:** utilizador sem permissão para criar/importar deve visualizar estado desabilitado ou ausência de ações conforme regra de autorização vigente.
- **Estado vazio:** quando não houver resultados para o filtro/pesquisa, o grid deve exibir estado vazio sem quebrar paginação e controles.
- **Concorrência:** alterações rápidas de filtro e pesquisa (incluindo duplo clique em paginação) não devem gerar estado inconsistente, dados duplicados ou UI bloqueada.

---

## Impacto Técnico
- **Camadas afetadas:** pages/ | components/ | hooks/ | types/ | lib/
- **Páginas/Rotas:** `/[locale]/(protected)/actions`
- **Componentes:** refatoração do grid de actions para componente genérico reutilizável; ajuste de toolbar (filtro/pesquisa), grupo de botões e área de paginação.
- **Hooks:** possível ajuste de contrato de parâmetros e retorno para suportar consumo desacoplado no componente genérico.
- **Serviços/API calls:** sem novos endpoints; mantém chamadas atuais de listagem de actions.
- **Estado global:** sem alteração obrigatória em Zustand.
- **Formulários:** não se aplica (sem React Hook Form nesta entrega).
- **Testes:** adicionar/ajustar testes de componente para comportamento do grid genérico e testes de integração da página `/actions` para filtros, pesquisa e paginação.
- **i18n:** validar/manter chaves existentes de labels e placeholders; adicionar novas chaves apenas se necessário em `messages/pt-BR.json` e `messages/en-US.json`.
- **Dependências:** reutilização de componentes shadcn já existentes (`Select`, `Input`, `Pagination`, `Button`), sem nova dependência externa.

## Definition of Ready
- [x] Requisitos de negócio claros
- [x] Critérios de aceite objetivos e verificáveis
- [x] Cenário de sucesso definido com Dado/Quando/Então
- [x] Cenário de insucesso definido com Dado/Quando/Então
- [x] Cenários de borda identificados
- [x] Contrato de API conhecido (endpoints e payloads, se aplicável)
- [x] Impacto por camada identificado
- [x] Prioridade definida
- [x] Severidade definida (quando bug)
- [x] Complexidade sugerida definida
- [x] Sem bloqueios para o Developer iniciar
