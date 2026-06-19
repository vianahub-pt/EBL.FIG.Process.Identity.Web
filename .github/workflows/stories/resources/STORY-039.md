---
id: STORY-039
title: "Criar novo recurso"
type: STORY
status: To do
resource: resources
endpoint: POST /v1/resources/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-039 — Criar novo recurso

## Como utilizador com perfil Admin, BackOffice ou Manager
Eu quero criar um novo recurso
Para que possa definir os recursos protegidos do sistema

## Endpoint
`POST /v1/resources/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice, Manager | Resource: Resources | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| appId | int | Sim | > 0 | ID da aplicação |
| name | string | Sim | max 100 chars | Nome do recurso |
| description | string | Não | max 255 chars | Descrição do recurso |

### Exemplo de Request
```json
{
  "appId": 2,
  "name": "Reports",
  "description": "Módulo de relatórios"
}
```

## Response

### Sucesso
**Status:** 201 Created

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 401 | Unauthorized | Token inválido |
| 403 | Forbidden | Sem permissão |
| 409 | Conflict | Recurso com mesmo nome já existe |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Criação bem-sucedida
- **Dado que** appId > 0 e name são válidos
- **Quando** submete
- **Então** o recurso é criado (201)

### CA-02: Validação de appId
- **Dado que** appId é 0 ou negativo
- **Quando** submete
- **Então** é exibido erro de validação

## Cenários BDD

### Cenário 1: Criação bem-sucedida
```gherkin
Given appId=2, name="Reports", description="Relatórios"
When submete o formulário
Then recurso criado com status 201
```

## Componentes Frontend Sugeridos
- `CreateResourceForm`, `useCreateResource`

## Observações
- appId obrigatório e > 0
- name obrigatório, max 100 chars
- description opcional, max 255 chars
