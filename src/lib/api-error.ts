import { isAxiosError } from 'axios';

export interface ApiErrorResponse {
  title: string;
  errors: Record<string, string[]>;
}

/**
 * Extrai uma lista de mensagens de erro de uma resposta Axios.
 * Suporta o padrão ErrorResponse do EBL.FIG.Common.Middleware.Lib (INotify/Notify).
 *
 * Formato da API:
 * { "title": "BadRequest", "errors": { "campo": ["msg"] } }
 * ou erro geral: { "errors": { "msg": ["msg"] } }
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
        values.forEach((msg) => {
          // Se a chave é igual à mensagem ou é "generalError", é erro geral sem campo
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

  // Fallback: mapear o título para mensagem legível
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
