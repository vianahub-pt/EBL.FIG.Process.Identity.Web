---
id: STORY-079
title: "Executar job manualmente"
type: STORY
status: To do
resource: jobs
endpoint: POST /v1/job-definitions/{id}/execute
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-079 — Executar job manualmente

## Como utilizador com perfil Admin ou BackOffice
Eu quero executar um job manualmente
Para que possa acionar tarefas agendadas quando necessário

## Endpoint
`POST /v1/job-definitions/{id}/execute`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: JobDefinitions | Action: Execute

## Request

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | int | Sim | ID do job a executar |

## Response

### Sucesso
**Status:** 200 OK
```json
{}
```

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Job inativo ou inválido |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Job não encontrado |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Execução manual bem-sucedida
- **Dado que** existe job ativo
- **Quando** clica em "Executar"
- **Então** o job é adicionado à fila de execução

### CA-02: Job inexistente
- **Dado que** o ID não existe
- **Quando** tenta executar
- **Então** é exibida mensagem de erro 404

## Cenários BDD

### Cenário 1: Execução manual
```gherkin
Given job id=1 ativo
When clica em "Executar Agora"
Then POST /v1/job-definitions/1/execute é enviado
And é exibida mensagem de confirmação de enfileiramento
```

## Componentes Frontend Sugeridos
- `ExecuteJobButton` — botão de execução manual com confirmação
- `useExecuteJob`

## Observações
- A execução é assíncrona — o botão confirma o enfileiramento, não a conclusão
