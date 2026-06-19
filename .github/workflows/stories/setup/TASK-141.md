---
id: TASK-141
title: "Configurar variável de ambiente para API em desenvolvimento local"
type: TASK
status: Done
resource: setup
priority: High
created_at: 2026-06-16
author: po
developer: dev-s
branch: "main"
pr: ""
---

# TASK-141 — Configurar variável de ambiente para API em desenvolvimento local

## Objetivo
Garantir que a aplicação web, quando executada localmente na porta 3000, se conecte à API do Identity em `https://localhost:7287`.

## Contexto
A API do Identity está sempre disponível localmente em:
- **Base URL:** `https://localhost:7287`
- **Swagger:** `https://localhost:7287/swagger/index.html?lang=pt-PT`

## Configuração Implementada

### `.env.local`
```
NEXT_PUBLIC_API_URL=https://localhost:7287
```

### `.env.local.example`
```
# URL base da API do Identity (desenvolvimento local)
NEXT_PUBLIC_API_URL=https://localhost:7287
```

## Ficheiros Alterados
- `.env.local` — URL da API actualizada de `http://localhost:5000` para `https://localhost:7287`
- `.env.local.example` — URL de exemplo actualizada com comentário

## Critérios de Aceite

### CA-01: Conexão à API local
- **Dado que** a aplicação está a correr em `http://localhost:3000`
- **Quando** é feita qualquer chamada à API
- **Então** a chamada é dirigida para `https://localhost:7287`

### CA-02: Variável documentada
- **Dado que** um novo developer clona o repositório
- **Quando** consulta `.env.local.example`
- **Então** encontra o endereço correcto da API local documentado

## Observações
- A variável `NEXT_PUBLIC_API_URL` é lida pelo `src/lib/axios.ts` como `baseURL`
- Para produção/staging, a variável deve ser configurada no ambiente de deploy com o URL correcto
- O certificado SSL local do .NET (localhost:7287) pode requerer `NODE_TLS_REJECT_UNAUTHORIZED=0` em desenvolvimento se houver erros de certificado auto-assinado
