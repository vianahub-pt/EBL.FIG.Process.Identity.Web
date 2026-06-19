'use client';

import { toast } from 'sonner';
import { parseApiError } from '@/lib/api-error';

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
   * Exibe toast de erro parseando automaticamente a resposta da API.
   * Suporta o padrão ErrorResponse do EBL.FIG.Common.Middleware.Lib.
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
