---
id: TASK-002
title: "Remediar vulnerabilidades de segurança reportadas pelo npm audit nas dependências do Jest"
type: task
priority: Alta
severity: Média
complexity: Baixa
status: For Tests
developer: dev-j
branch: fix/TASK-002-npm-audit-vulnerabilities
pr: https://github.com/vianahub-pt/EBL.FIG.Process.Identity.Web/pull/new/fix/TASK-002-npm-audit-vulnerabilities
created_at: 2026-06-19
updated_at: 2026-06-19
---

# TASK-002: Remediar vulnerabilidades de segurança reportadas pelo npm audit nas dependências do Jest

## Descrição
Como engenheiro de software responsável pelo projeto, quero eliminar as 20 vulnerabilidades de severidade **moderate** identificadas pelo `npm audit`, para que o pipeline de CI/CD não falhe por auditoria de segurança e o projeto mantenha conformidade com as políticas de segurança da organização.

## Classificação
- **Tipo:** task
- **Prioridade:** Alta
- **Severidade:** Média
- **Complexidade sugerida pelo PO:** Baixa
- **Developer provável:** dev-j
- **Motivo da complexidade:** A solução é técnica e localizada — consiste em adicionar `overrides` no `package.json` para forçar a versão segura de `js-yaml` (>=4.x), sem alteração funcional na aplicação. Não envolve novo componente, nova rota, lógica de negócio ou mudança arquitectural. O risco é baixo porque afeta apenas dependências de ambiente de testes (devDependencies).

## Contexto
O `npm audit` reporta **20 vulnerabilidades de severidade moderate** em cadeia, todas originadas no pacote `js-yaml` consumido por `@istanbuljs/load-nyc-config`.

### Cadeia de dependência vulnerável
```
js-yaml (vulnerável)
  └── @istanbuljs/load-nyc-config
        └── babel-plugin-istanbul
              └── @jest/transform
                    ├── babel-jest
                    ├── @jest/core
                    │     ├── @jest/reporters
                    │     ├── jest-circus
                    │     ├── jest-config
                    │     ├── jest-runner
                    │     ├── jest-runtime
                    │     ├── jest-snapshot
                    │     ├── jest-resolve-dependencies
                    │     └── jest-cli
                    ├── @jest/expect
                    ├── @jest/globals
                    └── jest (29.7.0)
                          └── create-jest
```

Todos os pacotes afetados são `devDependencies` — a vulnerabilidade não existe no bundle de produção.

### Solução proposta
1. **Opção A (preferida):** Adicionar `overrides` no `package.json` para forçar `js-yaml` >= 4.x em toda a árvore de dependências.
2. **Opção B (alternativa):** Verificar se existe versão do `jest` superior a `29.7.0` que já inclua a versão corrigida de `js-yaml` internamente.

Após aplicar a solução, validar que:
- `npm audit` reporta zero vulnerabilidades moderate relacionadas com `js-yaml`
- O build de produção não é afetado
- Todos os testes existentes continuam a passar

## Critérios de Aceite
- [ ] `npm audit` não reporta vulnerabilidades do tipo `js-yaml` / `@istanbuljs/load-nyc-config`
- [ ] O número total de vulnerabilidades moderate reportadas é 0 (relativas a esta cadeia)
- [ ] `npm run build` completa sem erros
- [ ] `npm test` completa com todos os testes a passar (sem regressões)
- [ ] A alteração está restrita a `package.json` e `package-lock.json` (sem alterações em código-fonte)
- [ ] Nenhuma dependência de produção (`dependencies`) é alterada ou forçada para versão diferente da atual
- [ ] O `package-lock.json` é atualizado e commitado juntamente com `package.json`

---

## Cenário de Sucesso — Vulnerabilidade eliminada via overrides

**Dado que** o `package.json` não contém `overrides` para `js-yaml`  
**Quando** é adicionada a secção `"overrides": { "js-yaml": "^4.1.0" }` em `package.json` e executado `npm install`  
**Então** o comando `npm audit` não reporta nenhuma vulnerabilidade relacionada com `js-yaml` ou `@istanbuljs/load-nyc-config`

## Cenário de Sucesso — Build de produção não afetado

**Dado que** os `overrides` foram aplicados em `package.json` e `npm install` foi executado  
**Quando** é executado `npm run build`  
**Então** o build conclui sem erros, sem warnings de deprecation e o output em `.next/` é gerado corretamente

## Cenário de Sucesso — Testes continuam a passar

**Dado que** os `overrides` foram aplicados e `npm install` foi executado  
**Quando** é executado `npm test`  
**Então** todos os testes passam sem falhas, sem erros de importação de módulo e sem regressões face à execução anterior

## Cenário de Insucesso — npm audit fix --force causa regressões

**Dado que** o Developer executa `npm audit fix --force` em vez de aplicar `overrides` manualmente  
**Quando** `npm test` é executado após o `audit fix --force`  
**Então** são detetadas falhas em testes existentes ou erros de compatibilidade de API do Jest, indicando que a abordagem `--force` não é segura e deve ser abandonada em favor dos `overrides`

## Cenários de Borda
- **Versão do jest:** verificar se `jest@29.7.0` é a versão mais recente disponível; se existir versão >=30.x estável que resolva a vulnerabilidade internamente, avaliar upgrade como alternativa aos `overrides`
- **Conflito de overrides:** se a versão forçada de `js-yaml` (^4.x) for incompatível com outra dependência transitiva, identificar o conflito e ajustar o constraint de versão
- **Lock file desatualizado:** se `package-lock.json` não for atualizado após a alteração de `package.json`, o `npm audit` pode continuar a reportar a vulnerabilidade — garantir que `npm install` é executado e o lock file é commitado
- **CI/CD:** verificar se o pipeline de CI executa `npm audit` como gate; se sim, confirmar que passa após a correção
- **Apenas devDependencies:** confirmar que nenhuma das dependências forçadas via `overrides` transita para o bundle de produção

---

## Impacto Técnico
- **Camadas afetadas:** nenhuma camada de código-fonte — apenas configuração de dependências
- **Páginas/Rotas:** nenhuma
- **Componentes:** nenhum
- **Hooks:** nenhum
- **Serviços/API calls:** nenhum
- **Estado global:** não aplicável
- **Formulários:** não aplicável
- **Testes:** todos os testes existentes devem continuar a passar sem alteração
- **i18n:** nenhuma chave adicionada
- **Ficheiros alterados:** `package.json`, `package-lock.json`
- **Dependências:** `js-yaml` forçado para `^4.1.0` via `overrides`

## Definition of Ready
- [x] Requisitos de negócio claros
- [x] Critérios de aceite objetivos e verificáveis
- [x] Cenário de sucesso definido com Dado/Quando/Então
- [x] Cenário de insucesso definido com Dado/Quando/Então
- [x] Cenários de borda identificados
- [x] Contrato de API conhecido (não aplicável — sem chamadas à API)
- [x] Impacto por camada identificado
- [x] Prioridade definida
- [x] Severidade definida
- [x] Complexidade sugerida definida
- [x] Sem bloqueios para o Developer iniciar
