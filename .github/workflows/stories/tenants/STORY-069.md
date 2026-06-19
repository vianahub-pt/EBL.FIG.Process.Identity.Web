---
id: STORY-069
title: "Criar novo tenant"
type: STORY
status: To do
resource: tenants
endpoint: POST /v1/tenants/
priority: Medium
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# STORY-069 — Criar novo tenant

## Como utilizador com perfil Admin ou BackOffice
Eu quero criar um novo tenant
Para que organizações possam ser integradas na plataforma

## Endpoint
`POST /v1/tenants/`

## Autenticação
Sim — Bearer Token JWT | Roles: Admin, BackOffice | Resource: Tenants | Action: Create

## Request

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Body
| Campo | Tipo | Obrigatório | Tamanho/Restrição | Descrição |
|-------|------|-------------|-------------------|-----------|
| name | string | Sim | max 200 chars | Nome do tenant |
| description | string | Sim | max 500 chars | Descrição |
| alias | string | Sim | max 30 chars | Alias único (slug) |
| urlImage | string | Não | max 500 chars | URL do logotipo |
| settings | string | Não | — | Configurações JSON do tenant |
| remarks | string | Não | max 1000 chars | Observações |

### Exemplo de Request
```json
{
  "name": "Nova Empresa SA",
  "description": "Empresa de tecnologia",
  "alias": "nova-empresa",
  "urlImage": "https://cdn.empresa.com/logo.png",
  "settings": "{}",
  "remarks": "Cliente premium"
}
```

## Response

### Sucesso
**Status:** 201 Created

### Erros Possíveis
| Status | Código | Descrição |
|--------|--------|-----------|
| 400 | Bad Request | Validação falhou |
| 500 | Internal Server Error | Erro interno |

## Critérios de Aceite

### CA-01: Criação bem-sucedida
- **Dado que** name, description e alias são válidos
- **Quando** submete
- **Então** tenant é criado (201)

### CA-02: Alias duplicado ou muito longo
- **Dado que** alias tem mais de 30 chars ou já existe
- **Quando** submete
- **Então** é exibido erro de validação

## Cenários BDD

### Cenário 1: Criação bem-sucedida
```gherkin
Given name="Nova Empresa", description="Empresa tech", alias="nova-empresa"
When submete
Then tenant criado com status 201
```

## Componentes Frontend Sugeridos
- `CreateTenantForm`, `useCreateTenant`

## Observações
- name obrigatório, max 200 chars
- description obrigatório, max 500 chars
- alias obrigatório, max 30 chars
- remarks opcional, max 1000 chars
