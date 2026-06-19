/**
 * Logging seguro para serviços.
 * - Server-side: registra via winston (logger.ts)
 * - Client-side: delega ao Route Handler POST /api/log (fire-and-forget)
 */
import { isAxiosError } from 'axios';

function extractErrorInfo(error: unknown): { message: string; meta: Record<string, unknown> } {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const url = error.config?.url ?? error.request?.responseURL ?? '';
    const method = (error.config?.method ?? '').toUpperCase();
    const responseData = error.response?.data;
    const responseStr =
      responseData !== undefined && responseData !== null
        ? typeof responseData === 'string'
          ? responseData
          : JSON.stringify(responseData)
        : '';

    const message = error.response
      ? `HTTP ${status} ${method} ${url}`
      : error.request
        ? `Sem resposta do servidor ${method} ${url}`
        : error.message;

    return {
      message,
      meta: {
        ...(status !== undefined && { status }),
        ...(method && { method }),
        ...(url && { upstreamUrl: url }),
        ...(responseStr && { response: responseStr }),
      },
    };
  }

  if (error instanceof Error) {
    return { message: error.message, meta: { stack: error.stack ?? '' } };
  }

  return { message: String(error), meta: {} };
}

export function logApiError(ctx: string, operation: string, error: unknown): void {
  const { message, meta } = extractErrorInfo(error);
  const fullMessage = `${operation}: ${message}`;

  if (typeof window !== 'undefined') {
    // Client-side: fire-and-forget — nunca propaga erro
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level: 'error', context: ctx, message: fullMessage, ...meta }),
    }).catch(() => {
      // Falha silenciosa — não interrompe o fluxo da aplicação
    });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('./logger') as typeof import('./logger');
    mod.createContextLogger(ctx).error(fullMessage);
  } catch {
    // Falhas de logging nunca devem propagar exceções para a aplicação
  }
}

