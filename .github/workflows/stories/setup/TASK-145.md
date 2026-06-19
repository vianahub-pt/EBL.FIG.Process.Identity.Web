---
id: TASK-145
title: "Configurar sistema de logging com ficheiros rotativos diários"
type: TASK
status: For Tests
resource: setup
priority: High
created_at: 2026-06-16
updated_at: 2026-06-16
author: po
developer: dev-s
branch: feature/task-145-logging
branch: ""
pr: ""
---

# TASK-145 — Configurar sistema de logging com ficheiros rotativos diários

## Objetivo
Implementar sistema de logging no servidor Next.js que grava ficheiros de log diários na pasta `/logs`, no formato `yyyymmdd-identity.log`, com conteúdo legível por humanos.

## Requisitos

### Formato do ficheiro de log
- **Pasta:** `<raiz do projecto>/logs/`
- **Nome do ficheiro:** `yyyymmdd-identity.log` (ex: `20260616-identity.log`)
- **Rotação:** um ficheiro por dia
- **Conteúdo:** texto simples, legível por humanos — não JSON

### Formato de cada linha de log
```
[2026-06-16 14:32:01] [INFO ] [auth] Login bem-sucedido — userId=42 tenantId=1
[2026-06-16 14:32:05] [WARN ] [api ] Resposta lenta — 3200ms — GET /v1/users
[2026-06-16 14:32:10] [ERROR] [auth] Falha no refresh token — userId=42
```
Campos por linha:
1. `[YYYY-MM-DD HH:mm:ss]` — timestamp local
2. `[LEVEL]` — `DEBUG`, `INFO `, `WARN `, `ERROR` (alinhados com espaço)
3. `[contexto]` — módulo/área da aplicação (ex: `auth`, `api`, `proxy`, `app`)
4. Mensagem livre — clara e descritiva

### Níveis de log
| Nível | Quando usar |
|-------|-------------|
| `DEBUG` | Detalhes de diagnóstico (apenas em desenvolvimento) |
| `INFO` | Eventos normais: login, logout, navegação, chamadas à API |
| `WARN` | Situações anómalas não críticas: resposta lenta, token perto de expirar |
| `ERROR` | Falhas: erro de autenticação, API inacessível, excepção não tratada |

### Comportamento
- Em **desenvolvimento** (`NODE_ENV=development`): logs em ficheiro E no console
- Em **produção** (`NODE_ENV=production`): logs apenas em ficheiro
- Nível mínimo configurável via variável de ambiente `LOG_LEVEL` (padrão: `info`)
- Ficheiros de log **não são commitados** no git (adicionar `logs/` ao `.gitignore`)
- Criar pasta `logs/` automaticamente se não existir
- Manter ficheiros dos últimos **30 dias** (ficheiros mais antigos são eliminados automaticamente)

## Stack Técnica

### Biblioteca a usar
- **`winston`** (logger principal, versão estável LTS)  
- **`winston-daily-rotate-file`** (transport de rotação diária, versão estável)

```bash
npm install winston winston-daily-rotate-file
```

### Não usar
- Versões `beta`, `rc`, `canary` ou `experimental` de qualquer dependência
- Bibliotecas deprecated

## Ficheiros a Criar/Alterar

| Ficheiro | Acção | Descrição |
|----------|-------|-----------|
| `src/lib/logger.ts` | Criar | Instância configurada do winston |
| `.env.local` | Alterar | Adicionar `LOG_LEVEL=debug` |
| `.env.local.example` | Alterar | Adicionar `LOG_LEVEL=info` com comentário |
| `.gitignore` | Alterar | Adicionar `/logs` |
| `logs/.gitkeep` | Criar | Manter pasta no git sem os ficheiros de log |

## Especificação de `src/lib/logger.ts`

```typescript
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';
const LOG_DIR = path.join(process.cwd(), 'logs');

// Formato humano: [2026-06-16 14:32:01] [INFO ] [contexto] mensagem
const humanFormat = winston.format.printf(({ timestamp, level, message, context }) => {
  const paddedLevel = level.toUpperCase().padEnd(5);
  const ctx = context ? `[${String(context).padEnd(5)}]` : '[app  ]';
  return `[${timestamp}] [${paddedLevel}] ${ctx} ${message}`;
});

const fileTransport = new DailyRotateFile({
  dirname: LOG_DIR,
  filename: '%DATE%-identity.log',
  datePattern: 'YYYYMMDD',
  maxFiles: '30d',
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    humanFormat
  ),
});

const transports: winston.transport[] = [fileTransport];

if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      level: LOG_LEVEL,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        humanFormat
      ),
    })
  );
}

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports,
});

export default logger;

// Helper para logs com contexto
export const createContextLogger = (context: string) => ({
  debug: (msg: string) => logger.debug(msg, { context }),
  info: (msg: string) => logger.info(msg, { context }),
  warn: (msg: string) => logger.warn(msg, { context }),
  error: (msg: string) => logger.error(msg, { context }),
});
```

## Exemplo de Uso

```typescript
// Em qualquer Server Component, Server Action ou Route Handler:
import logger, { createContextLogger } from '@/lib/logger';

const authLogger = createContextLogger('auth');
authLogger.info('Login bem-sucedido — userId=42 tenantId=1');
authLogger.warn('Token perto de expirar — userId=42');
authLogger.error('Falha no refresh token — userId=42');

// Uso directo:
logger.info('Aplicação iniciada', { context: 'app' });
```

## Critérios de Aceite

### CA-01: Ficheiro de log criado
- **Dado que** a aplicação está em execução
- **Quando** é gerado um log
- **Então** é criado o ficheiro `logs/YYYYMMDD-identity.log` com a data actual

### CA-02: Formato humano legível
- **Dado que** um log é escrito
- **Quando** o ficheiro é aberto num editor de texto
- **Então** cada linha segue o formato `[YYYY-MM-DD HH:mm:ss] [LEVEL] [ctx  ] mensagem`

### CA-03: Rotação diária
- **Dado que** a aplicação corre durante vários dias
- **Quando** a data muda
- **Então** é criado um novo ficheiro com a nova data

### CA-04: Retenção de 30 dias
- **Dado que** existem ficheiros de log com mais de 30 dias
- **Quando** o winston-daily-rotate-file executa a limpeza
- **Então** os ficheiros mais antigos são eliminados automaticamente

### CA-05: Console em desenvolvimento
- **Dado que** `NODE_ENV=development`
- **Quando** é gerado um log
- **Então** o log aparece no console E no ficheiro

### CA-06: Sem logs no git
- **Dado que** o developer faz `git add .`
- **Quando** o git processa os ficheiros
- **Então** os ficheiros em `logs/` são ignorados

### CA-07: Build sem erros
- **Dado que** o developer executa `npm run build`
- **Quando** o build termina
- **Então** não existem erros TypeScript nem warnings

## Cenários BDD

### Cenário 1: Log INFO gerado correctamente
```gherkin
Given a aplicação está a correr em desenvolvimento
When createContextLogger('auth').info('Login bem-sucedido — userId=1') é chamado
Then o ficheiro logs/YYYYMMDD-identity.log contém a linha
  "[YYYY-MM-DD HH:mm:ss] [INFO ] [auth ] Login bem-sucedido — userId=1"
And o mesmo log aparece no console com cores
```

### Cenário 2: Rotação no novo dia
```gherkin
Given existe o ficheiro logs/20260616-identity.log
When a data muda para 2026-06-17 e um log é gerado
Then é criado o ficheiro logs/20260617-identity.log
And o ficheiro 20260616-identity.log permanece intacto
```

### Cenário 3: Pasta logs ignorada pelo git
```gherkin
Given o ficheiro .gitignore contém "/logs"
When o developer executa "git status"
Then os ficheiros *.log na pasta logs/ não aparecem como untracked
And o ficheiro logs/.gitkeep aparece como tracked
```

## Observações Técnicas
- O `logger` só deve ser usado em código **server-side** (Server Components, Route Handlers, Server Actions, `src/lib/`, `src/services/` no servidor)
- Em código client-side (`'use client'`), usar `console.error`/`console.warn` — o winston não funciona no browser
- O `winston-daily-rotate-file` cria a pasta `logs/` automaticamente se não existir
- Para TypeScript, o winston-daily-rotate-file requer `@types/winston-daily-rotate-file` ou a tipagem incluída no pacote
