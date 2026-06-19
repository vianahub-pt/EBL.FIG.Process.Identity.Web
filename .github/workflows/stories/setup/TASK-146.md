---
id: TASK-146
title: "Sistema genérico de notificações toast para respostas da API"
type: TASK
status: To do
resource: setup
priority: High
created_at: 2026-06-16
author: po
developer: ""
branch: ""
pr: ""
---

# TASK-146 — Sistema genérico de notificações toast para respostas da API

## Objetivo
Implementar um utilitário genérico de notificações via toast (sonner) que qualquer hook ou página da aplicação pode usar para exibir mensagens de sucesso e de erro retornadas pela API do Identity.

## Contexto — Padrão de Resposta da API (Middleware Notify)

A API do Identity usa `EBL.FIG.Common.Middleware.Lib` com o padrão `INotify`/`Notify`.
Quando a API retorna erros, a resposta JSON segue **sempre** este formato:

```json
{
  "title": "BadRequest",
  "errors": {
    "nomeDoCampo": ["mensagem de erro"],
    "outroErro": ["outra mensagem"]
  }
}
```

**Títulos possíveis (`title`) e seus status codes:**
| title | HTTP Status |
|-------|-------------|
| `BadRequest` | 400 |
| `Unauthorized` | 401 |
| `Forbidden` | 403 |
| `NotFound` | 404 |
| `Conflict` | 409 |
| `Gone` | 410 |
| `UnprocessableEntity` | 422 |
| `TooManyRequests` | 429 |
| `InternalServerError` | 500 |
| `ServiceUnavailable` | 503 |

**Dois padrões de erro no campo `errors`:**
1. **Erro de campo:** chave = nome do campo, valor = array de mensagens
   ```json
   { "errors": { "email": ["E-mail inválido"] } }
   ```
2. **Erro geral (sem campo):** chave = a própria mensagem, valor = array com a mesma mensagem
   ```json
   { "errors": { "Utilizador já existe": ["Utilizador já existe"] } }
   ```

**Resposta de sucesso:** HTTP 200/201/204 — sem body de erro, o body é o dado retornado ou vazio.

## Especificação Técnica

### `src/lib/api-error.ts` — Parser de erros da API
Utilitário que extrai mensagens legíveis de uma resposta de erro Axios:

```typescript
import { isAxiosError } from 'axios';

export interface ApiErrorResponse {
  title: string;
  errors: Record<string, string[]>;
}

/**
 * Extrai uma lista de mensagens de erro de uma resposta Axios.
 * Suporta o padrão ErrorResponse do EBL.FIG.Common.Middleware.Lib.
 */
export function parseApiError(error: unknown): string[] {
  if (!isAxiosError(error)) {
    return ['Ocorreu um erro inesperado. Tente novamente.'];
  }

  const data = error.response?.data as ApiErrorResponse | undefined;

  if (!data) {
    return ['Não foi possível conectar ao servidor.'];
  }

  // Extrair todas as mensagens do dicionário errors
  if (data.errors && typeof data.errors === 'object') {
    const messages: string[] = [];
    for (const [key, values] of Object.entries(data.errors)) {
      if (Array.isArray(values)) {
        // Se a chave é diferente dos valores, é um erro de campo — incluir campo
        values.forEach(msg => {
          // Se key == msg, é erro geral sem campo
          if (key === msg || key === 'generalError') {
            messages.push(msg);
          } else {
            messages.push(`${key}: ${msg}`);
          }
        });
      }
    }
    if (messages.length > 0) return messages;
  }

  // Fallback: usar o título
  if (data.title) {
    return [mapTitleToMessage(data.title)];
  }

  return ['Ocorreu um erro. Tente novamente.'];
}

/**
 * Extrai a primeira mensagem de erro (útil para toasts simples).
 */
export function getFirstApiError(error: unknown): string {
  return parseApiError(error)[0];
}

function mapTitleToMessage(title: string): string {
  const map: Record<string, string> = {
    BadRequest: 'Pedido inválido.',
    Unauthorized: 'Não autorizado. Faça login novamente.',
    Forbidden: 'Sem permissão para esta acção.',
    NotFound: 'Recurso não encontrado.',
    Conflict: 'Conflito: o recurso já existe.',
    Gone: 'Recurso não está mais disponível.',
    UnprocessableEntity: 'Dados inválidos.',
    TooManyRequests: 'Muitos pedidos. Aguarde e tente novamente.',
    InternalServerError: 'Erro interno do servidor.',
    ServiceUnavailable: 'Serviço indisponível. Tente mais tarde.',
  };
  return map[title] ?? 'Ocorreu um erro. Tente novamente.';
}
```

### `src/hooks/use-notification.ts` — Hook genérico de toast
```typescript
'use client';

import { toast } from 'sonner';
import { parseApiError, getFirstApiError } from '@/lib/api-error';

export function useNotification() {
  const success = (message: string, description?: string) => {
    toast.success(message, { description });
  };

  const error = (message: string, description?: string) => {
    toast.error(message, { description });
  };

  const warning = (message: string, description?: string) => {
    toast.warning(message, { description });
  };

  const info = (message: string, description?: string) => {
    toast.info(message, { description });
  };

  /**
   * Exibe um toast de erro parseando automaticamente a resposta da API.
   * Se houver múltiplos erros, exibe o primeiro como título e os restantes como descrição.
   */
  const apiError = (err: unknown, fallback?: string) => {
    const messages = parseApiError(err);
    if (messages.length === 0) {
      toast.error(fallback ?? 'Ocorreu um erro. Tente novamente.');
      return;
    }
    const [first, ...rest] = messages;
    toast.error(first, {
      description: rest.length > 0 ? rest.join(' • ') : undefined,
    });
  };

  return { success, error, warning, info, apiError };
}
```

### Integração com `use-auth.ts`
O `useLogin` deve usar `useNotification` para:
- `onSuccess`: toast de sucesso "Login realizado com sucesso"
- `onError`: toast de erro com `apiError(err)` parseando a resposta da API

## Ficheiros a Criar/Alterar

| Ficheiro | Acção | Descrição |
|----------|-------|-----------|
| `src/lib/api-error.ts` | Criar | Parser de erros da API (padrão Notify) |
| `src/hooks/use-notification.ts` | Criar | Hook genérico de toast |
| `src/hooks/use-auth.ts` | Alterar | Usar `useNotification` em `onSuccess` e `onError` |
| `messages/pt-BR.json` | Alterar | Adicionar chaves de notificações |
| `messages/en-US.json` | Alterar | Idem em inglês |

## Exemplo de Uso em Outros Hooks

```typescript
// Em qualquer useMutation:
const { apiError, success } = useNotification();

return useMutation({
  mutationFn: (data) => usersService.create(data),
  onSuccess: () => {
    success('Utilizador criado com sucesso');
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
  onError: (err) => {
    apiError(err);
  },
});
```

## Critérios de Aceite

### CA-01: Toast de sucesso no login
- **Dado que** o utilizador envia credenciais válidas
- **Quando** a API retorna 200 OK
- **Então** aparece um toast verde "Login realizado com sucesso"

### CA-02: Toast de erro com mensagem da API
- **Dado que** a API retorna 400 com `{ title: "BadRequest", errors: { "Utilizador não encontrado": ["Utilizador não encontrado"] } }`
- **Quando** o hook recebe o erro
- **Então** aparece um toast vermelho com a mensagem "Utilizador não encontrado"

### CA-03: Toast com múltiplos erros
- **Dado que** a API retorna múltiplos erros em `errors`
- **Quando** o hook recebe o erro
- **Então** o toast mostra o primeiro erro como título e os restantes como descrição separados por "•"

### CA-04: Toast de erro de campo
- **Dado que** a API retorna `{ errors: { "email": ["E-mail inválido"] } }`
- **Quando** o hook recebe o erro
- **Então** o toast mostra "email: E-mail inválido"

### CA-05: Fallback sem conexão
- **Dado que** a API não está acessível (network error)
- **Quando** o hook recebe o erro
- **Então** o toast mostra "Não foi possível conectar ao servidor."

### CA-06: Build sem erros
- `npm run build` passa sem erros TypeScript

## Cenários BDD

### Cenário 1: Login com sucesso
```gherkin
Given o utilizador está na página de login
When preenche credenciais válidas e clica em "Entrar"
And a API retorna 200 OK
Then aparece toast verde "Login realizado com sucesso"
And o utilizador é redirecionado para o dashboard
```

### Cenário 2: Login com credenciais inválidas
```gherkin
Given o utilizador está na página de login
When preenche credenciais erradas e clica em "Entrar"
And a API retorna 400 com errors: { "Credenciais inválidas": ["Credenciais inválidas"] }
Then aparece toast vermelho "Credenciais inválidas"
And o utilizador permanece na página de login
```

### Cenário 3: Erro 401 Unauthorized
```gherkin
Given o utilizador está autenticado numa página protegida
When a sessão expira e o refresh token falha
Then aparece toast vermelho "Não autorizado. Faça login novamente."
And o utilizador é redirecionado para /login
```
